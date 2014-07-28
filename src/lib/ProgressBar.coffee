# Dependencies
EventEmitter = require('events').EventEmitter

# Define
class ProgressBar extends EventEmitter
  _tick: null
  _total: null
  _bar: null
  _step: null
  _domain: null

  constructor: ->
    @start()

  start: ->
    @_tick = 0
    @_total = 1

    d = @_domain = require('domain').create()

    # bubble domain errors
    d.on 'error', (err) =>
      @emit('error', err)

    # destroy the old progressbar and create our new one
    @on 'step', =>
      @destroy()
      message = "Performing #{@_step} at :current/:total :percent :bar"
      width = 50
      d.run =>
        try
          progress = require('progress')
          @_bar = new progress(message, {
            total: @_total,
            width: width
            clear: true
          })
        catch err
          d.emit('error', err)

    # update our bar's total
    @on 'total', =>
      @_bar?.total = @_total

    # update our bar's progress
    @on 'tick', =>
      @_bar?.tick(@_tick - @_bar.curr)

  step: (s) -> if s? then @setStep(s) else @getStep()
  getStep: -> @_step
  setStep: (s) -> @_step = s; @emit('step', @_step); @setTick(0); @setTotal(1); @

  total: (t) -> if t? then @setTotal(t) else @addTotal()
  getTotal: -> @_total
  addTotal: (t=1) -> @_total += t; @emit('total', @_total); @
  setTotal: (t) -> @_total = t or 1; @emit('total', @_total); @

  tick: (t) -> if t? then @setTick(t) else @addTick()
  getTick: -> @_tick
  addTick: (t=1) -> @_tick += t; @emit('tick', @_tick); @
  setTick: (t) -> @_tick = t; @emit('tick', @_tick); @

  destroy: ->
    return @  unless @_bar?
    d = @_domain
    d.run =>
      @_bar.terminate()
    d.run =>
      @_bar = null
    @

  finish: ->
    if @_bar?
      @destroy()
      @emit('finish')
    @_domain?.dispose()
    @removeAllListeners()
    @

module.exports = ProgressBar
