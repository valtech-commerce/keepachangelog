# @absolunet/keepachangelog-lint

[![npm](https://img.shields.io/npm/v/@absolunet/keepachangelog-lint.svg)](https://www.npmjs.com/package/@absolunet/keepachangelog-lint)
[![npm dependencies](https://david-dm.org/absolunet/node-keepachangelog-lint/status.svg)](https://david-dm.org/absolunet/node-keepachangelog-lint)
[![npms](https://badges.npms.io/%40absolunet%2Fkeepachangelog-lint.svg)](https://npms.io/search?q=%40absolunet%2Fkeepachangelog-lint)
[![Travis CI](https://travis-ci.com/absolunet/node-keepachangelog.svg?branch=master)](https://travis-ci.com/absolunet/node-keepachangelog/builds)

> [Keep a Changelog](https://keepachangelog.com/) customizable linter


## Install

```bash
$ npm install @absolunet/keepachangelog-lint
```


## Usage

```js
import { Linter } from '@absolunet/keepachangelog-lint';

const linter = new Linter();

const results = linter.executeOnFile('./CHANGELOG.md');
// [
// 	{
// 		rule: "require-release-date",
// 		data: {
// 			release: "1.2.3 - New stuff"
// 		},
// 		message: {
// 			template: "Release {{release}} must contain a date.",
// 			plain:    "Release '1.2.3 - New stuff' must contain a date."
// 		}
// 	},
// 	{
// 		rule: "strict-release-date",
// 		data: {
// 			date:   "2011/03/25",
// 			format: "YYYY-MM-DD"
// 		},
// 		message: {
// 			template: "Date {{date}} does not respect {{format}} format.",
// 			plain:    "Date '2011/03/25' does not respect 'YYYY-MM-DD' format."
// 		}
// 	}
// ]
```



## Documentation

View [documentation](https://documentation.absolunet.com/node-keepachangelog/lint)






<br><br>

## License

MIT © [Absolunet](https://absolunet.com)
