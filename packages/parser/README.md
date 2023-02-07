# @valtech-commerce/keepachangelog-parser

[![npm](https://img.shields.io/npm/v/@valtech-commerce/keepachangelog-parser.svg)](https://www.npmjs.com/package/@valtech-commerce/keepachangelog-parser)
[![npm dependencies](https://david-dm.org/valtech-commerce/keepachangelog-parser/status.svg)](https://david-dm.org/valtech-commerce/keepachangelog-parser)
[![npms](https://badges.npms.io/%40valtech-commerce%2Fkeepachangelog-parser.svg)](https://npms.io/search?q=%40valtech-commerce%2Fkeepachangelog-parser)
[![Travis CI](https://travis-ci.com/valtech-commerce/keepachangelog.svg?branch=master)](https://travis-ci.com/valtech-commerce/keepachangelog/builds)

> [Keep a Changelog](https://keepachangelog.com/) parser
Parsed manually and via [Marked](https://marked.js.org/).


## Install

```bash
$ npm install @valtech-commerce/keepachangelog-parser
```


## Usage

```js
import { parser } from '@valtech-commerce/keepachangelog-parser';

const { data } = parser.parseFile('./CHANGELOG.md');

const { changes } = data.unreleased;
// [
// 	{
// 		type: 'Added',
// 		content: ['Add xyz']
// 	},
// 	{
// 		type: 'Changed',
// 		content: ['Switch a for b', 'Switch c for d']
// 	}
// ]

const { version, date, yanked, link description } = data.releases[0];
// {
// 	version:     SemVer { version: '1.0.0' },
// 	date:        Date { 2019-11-11T00:00:00.000Z },
// 	yanked:      false,
// 	link:        'https://github.com/xyz/abc/compare/1.0.0-rc.1...1.0.0',
// 	description: ['First major version', 'Finally stable']
// }
```

Returned `object` also contains raw parsings, Marked tokens and processed data.



## Documentation

View [documentation](https://valtech-commerce.github.io/keepachangelog/parser)






<br><br>

## License

MIT © [Valtech Canada inc.](https://www.valtech.ca/)
