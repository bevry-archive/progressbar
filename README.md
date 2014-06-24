
<!-- TITLE/ -->

# Progress Bar

<!-- /TITLE -->


<!-- BADGES/ -->

[![Build Status](http://img.shields.io/travis-ci/bevry/progressbar.png?branch=master)](http://travis-ci.org/bevry/progressbar "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/progressbar.png)](https://npmjs.org/package/progressbar "View this project on NPM")
[![Dependency Status](https://david-dm.org/bevry/progressbar.png?theme=shields.io)](https://david-dm.org/bevry/progressbar)
[![Development Dependency Status](https://david-dm.org/bevry/progressbar/dev-status.png?theme=shields.io)](https://david-dm.org/bevry/progressbar#info=devDependencies)<br/>
[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")
[![BitCoin donate button](http://img.shields.io/bitcoin/donate.png?color=yellow)](https://coinbase.com/checkouts/9ef59f5479eec1d97d63382c9ebcb93a "Donate once-off to this project using BitCoin")
[![Wishlist browse button](http://img.shields.io/wishlist/browse.png?color=yellow)](http://amzn.com/w/2F8TXKSNAFG4V "Buy an item on our wishlist for us")

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

A nice wrapper around [TJ Holowaychuck's](https://github.com/visionmedia) [node-progress](https://github.com/visionmedia/node-progress) with chaining, domains, and steps

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

## Install

### [NPM](http://npmjs.org/)
- Use: `require('progressbar')`
- Install: `npm install --save progressbar`

<!-- /INSTALL -->


## Usage

### Example

``` javascript
require('progressbar').ProgressBar.create()
	.step('the task you are currently performing')
	.setTotal(5)
	.setTick(1)
	.setTick(2)
	.setTick(3)
	.addTick()
	.addTick();
```

### ProgressBar API

- `step(step)` - set the step, resets the total and the tick
- `setTick(ticks)` - set the completed ticks
- `addTick()` - add 1 to the completed ticks
- `getTick()` - get the completed ticks
- `setTotal(total)` - set the total ticks
- `addTotal()` - add 1 to the total ticks
- `getTotal()` - get the total ticks
- `finish()` - finish manually, will destroy the progress bar


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `HISTORY.md` file.](https://github.com/bevry/progressbar/blob/master/HISTORY.md#files)

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/bevry/progressbar/blob/master/CONTRIBUTING.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")
[![BitCoin donate button](http://img.shields.io/bitcoin/donate.png?color=yellow)](https://coinbase.com/checkouts/9ef59f5479eec1d97d63382c9ebcb93a "Donate once-off to this project using BitCoin")
[![Wishlist browse button](http://img.shields.io/wishlist/browse.png?color=yellow)](http://amzn.com/w/2F8TXKSNAFG4V "Buy an item on our wishlist for us")

### Contributors

These amazing people have contributed code to this project:

- [Benjamin Lupton](https://github.com/balupton) <b@lupton.cc> — [view contributions](https://github.com/bevry/progressbar/commits?author=balupton)
- [timoxley](https://github.com/timoxley) — [view contributions](https://github.com/bevry/progressbar/commits?author=timoxley)
- [Zearin](https://github.com/Zearin) — [view contributions](https://github.com/bevry/progressbar/commits?author=Zearin)

[Become a contributor!](https://github.com/bevry/progressbar/blob/master/CONTRIBUTING.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/)

Copyright &copy; 2013+ Bevry Pty Ltd <us@bevry.me> (http://bevry.me)

<!-- /LICENSE -->


