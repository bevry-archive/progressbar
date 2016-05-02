// Define
class ProgressBar extends require('events').EventEmitter {

	static create (...args) {
		return new this(...args)
	}

	constructor (...args) {
		super(...args)

		this._tick = null
		this._total = null
		this._bar = null
		this._step = null
		this._domain = null

		this.start()
	}

	start () {
		const me = this
		this._tick = 0
		this._total = 1
		this._domain = require('domain').create()

		// bubble domain errors
		this._domain.on('error', function (err) {
			me.emit('error', err)
		})

		// destroy the old progressbar and create our new one
		this.on('step', function () {
			me.destroy()
			const message = `Performing ${me._step} at :current/:total :percent :bar`
			const width = 50
			me._domain.run(function () {
				try {
					const Progress = require('progress')
					me._bar = new Progress(message, {
						width,
						total: me._total,
						clear: true
					})
				}
				catch ( err ) {
					me._domain.emit('error', err)
				}
			})
		})

		// update our bar's total
		this.on('total', function () {
			if ( me._bar )  me._bar.total = me._total
		})

		// update our bar's progress
		this.on('tick', function () {
			if ( me._bar )  me._bar.tick(me._tick - me._bar.curr)
		})

		// chain
		return this
	}

	step (s) {
		if ( s != null ) {
			this.setStep(s)
		}
		else {
			this.getStep()
		}
		return this
	}
	getStep () {
		return this._step
	}
	setStep (s) {
		this._step = s
		this.emit('step', this._step)
		this.setTick(0)
		this.setTotal(1)
		return this
	}

	total (t) {
		if ( t != null ) {
			this.setTotal(t)
		}
		else {
			this.addTotal()
		}
		return this
	}
	getTotal () {
		return this._total
	}
	addTotal (t = 1) {
		this._total += t
		this.emit('total', this._total)
		return this
	}
	setTotal (t = 1) {
		this._total = t
		this.emit('total', this._total)
		return this
	}

	tick (t) {
		if ( t != null ) {
			this.setTick(t)
		}
		else {
			this.addTick()
		}
		return this
	}
	getTick () {
		return this._tick
	}
	addTick (t = 1) {
		this._tick += t
		this.emit('tick', this._tick)
		return this
	}
	setTick (t) {
		this._tick = t
		this.emit('tick', this._tick)
		return this
	}

	destroy () {
		if ( this._bar == null )  return this
		const me = this
		this._domain.run(function () {
			me._bar.terminate()
		})
		this._domain.run(function () {
			me._bar = null
		})
		return this
	}
	finish () {
		if ( this._bar != null ) {
			this.destroy()
			this.emit('finish')
		}
		if ( this._domain ) {
			this._domain.dispose()
		}
		this.removeAllListeners()
		return this
	}
}

// Export
module.exports = ProgressBar

// Backwards API Compat
module.exports.ProgressBar = ProgressBar
