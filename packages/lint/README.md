# @valtech-commerce/keepachangelog-lint

[![npm](https://img.shields.io/npm/v/@valtech-commerce/keepachangelog-lint.svg)](https://www.npmjs.com/package/@valtech-commerce/keepachangelog-lint)
[![npm dependencies](https://david-dm.org/valtech-commerce/keepachangelog-lint/status.svg)](https://david-dm.org/valtech-commerce/keepachangelog-lint)
[![npms](https://badges.npms.io/%40valtech-commerce%2Fkeepachangelog-lint.svg)](https://npms.io/search?q=%40valtech-commerce%2Fkeepachangelog-lint)
[![Travis CI](https://travis-ci.com/valtech-commerce/keepachangelog.svg?branch=master)](https://travis-ci.com/valtech-commerce/keepachangelog/builds)

> [Keep a Changelog](https://keepachangelog.com/) customizable linter


## Install

```bash
$ npm install @valtech-commerce/keepachangelog-lint
```


## Usage

```js
import { Linter } from '@valtech-commerce/keepachangelog-lint';

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

View [documentation](https://valtech-commerce.github.io/keepachangelog/lint)






<br><br>

## License

MIT © [Valtech Canada inc.](https://www.valtech.ca/)
