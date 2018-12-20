import Domain from "domain";
import { EventEmitter } from "events";
import Progress from "progress";

class ProgressBar extends EventEmitter {
	public static ProgressBar = ProgressBar; // Backwards API Compat

	public static create(): ProgressBar {
		return new ProgressBar();
	}

	private _tick = 0;
	private _total = 1;
	private _bar: Progress | null = null;
	private _step: string | null = null;
	private _domain: Domain.Domain | null = null;

	constructor() {
		super();
		this.start();
	}

	public step(s: string): this {
		if (s != null) {
			this.setStep(s);
		} else {
			throw new Error("step is now just an alias for setStep to ensure consistent return value");
		}
		return this;
	}
	public getStep(): string | null {
		return this._step;
	}
	public setStep(s: string): this {
		if (!s) { throw new Error("no step param defined"); }
		this._step = s;
		this.emit("step", this._step);
		this.setTick(0);
		this.setTotal(1);
		return this;
	}

	public total(t: number): this {
		if (t != null) {
			this.setTotal(t);
		} else {
			this.addTotal();
		}
		return this;
	}
	public getTotal(): number {
		return this._total;
	}
	public addTotal(t: number = 1): this {
		this._total += t;
		this.emit("total", this._total);
		return this;
	}
	public setTotal(t: number): this {
		this._total = t || 1;  // must be truthy rather than null, otherwise: RangeError: Invalid array length
		this.emit("total", this._total);
		return this;
	}

	public tick(t: number | null) {
		if (t != null) {
			this.setTick(t);
		} else {
			this.addTick();
		}
		return this;
	}
	public getTick(): number {
		return this._tick;
	}
	public addTick(t: number = 1): this {
		this._tick += t;
		this.emit("tick", this._tick);
		return this;
	}
	public setTick(t: number): this {
		this._tick = t;
		this.emit("tick", this._tick);
		return this;
	}

	public finish(next?: () => void) {
		this.destroy(() => {
			this.emit("finish");
			if (this._domain) { this._domain.exit(); }
			this.removeAllListeners();
			if (next) { next(); }
		});
		return this;
	}

	protected destroy(next?: () => void) {
		if (this._bar != null) {
			if (this._domain) {
				this._domain.run(() => {
					if (this._bar) {
						this._bar.terminate();
					}
				});
				this._domain.run(() => {
					this._bar = null;
				});
			} else {
				this._bar.terminate();
				this._bar = null;
			}
		}
		if (next) { next(); }
		return this;
	}
	protected start(): this {
		this._tick = 0;
		this._total = 1;
		try {
			this._domain = Domain.create();
		} catch (err) { /* Just ignore */ }

		// bubble domain errors
		if (this._domain) {
			this._domain.on("error", (err) => {
				this.emit("error", err);
			});
		}

		// destroy the old progressbar and create our new one
		this.on("step", () => {
			this.destroy();
			const message = `Performing ${this._step} at :current/:total :percent :bar`;
			if (this._domain) {
				this._domain.run(this.onStep.bind(this, message));
			} else {
				this.onStep(message);
			}
		});

		// update our bar's total
		this.on("total", () => {
			if (this._bar) { this._bar.total = this._total; }
		});

		// update our bar's progress
		this.on("tick", () => {
			if (this._bar) { this._bar.tick(this._tick - this._bar.curr); }
		});

		// chain
		return this;
	}

	private onStep(message: string) {
		try {
			this._bar = new Progress(message, {
				clear: true,
				total: this._total,
				width: 50,
			});
		} catch (err) {
			if (this._domain) {
				this._domain.emit("error", err);
			} else {
				this.emit("error", err);
			}
		}
	}
}

export = ProgressBar;
