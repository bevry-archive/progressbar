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

		this.start()
	}

	start () {
		const me = this
		this._tick = 0
		this._total = 1

		// destroy the old progressbar and create our new one
		this.on('step', function () {
			me.destroy()
			const message = `Performing ${me._step} at :current/:total :percent :bar`
			try {
				const Progress = require('progress')
				me._bar = new Progress(message, {
					width: 50,
					total: me._total,
					clear: true
				})
			}
			catch (err) {
				me.emit('error', err)
			}
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
			throw new Error('step is now just an alias for setStep to ensure consistent return value')
		}
		return this
	}
	getStep () {
		return this._step
	}
	setStep (s) {
		if ( !s )  throw new Error('no step param defined')
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
	setTotal (t) {
		this._total = t || 1  // must be truthy rather than null, otherwise: RangeError: Invalid array length
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

	destroy (next) {
		if ( this._bar != null ) {
			const me = this
			me._bar.terminate()
			me._bar = null
		}
		if ( next )  next()
		return this
	}
	finish (next) {
		const me = this
		this.destroy(function () {
			me.emit('finish')
			me.removeAllListeners()
			if ( next )  next()
		})
		return this
	}
}

// Export
module.exports = ProgressBar

// Backwards API Compat
module.exports.ProgressBar = ProgressBar
