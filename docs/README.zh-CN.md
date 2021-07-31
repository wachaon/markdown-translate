# WES

*wes*是在*Windows Script Host*上执行*ECMAScript*的框架

## 特征

-   将脚本引擎更改为*Chakra*并启用*ECMAScript2015* *Chakra*
-   *cscript.exe* 32位*cscript.exe* ，因此避免了64位环境中的特殊错误
-   您可以使用`require`导入模块
-   彩色字符可以输出到标准输出
-   自动猜测文件编码

## 功能未解决

-   `WScript.Quit`无法中断程序，并且不返回错误代码
-   异步处理
-   `WScript.CreateObject`的第二个参数的*event prefix*

## 安装

*wes*需要的只是*wes.js*文件。要下载，请启动命令提示符并输入以下命令。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes*在执行时作为`SendKeys`的实现*WScript.Shell*使用。 *wes.js*保存*wes.js*的目录的路径包含*ascii*以外的字符，则`SendKeys`将无法正确发送它，并且脚本将无法运行。在这种情况下，请配置路径以仅使用*ascii*保存*wes.js*

## 用法

在命令行中，在`wes`之后指定作为程序起点的文件。脚本扩展名*.js*可以省略。

```shell
wes index
```

另外，由于*wes*具有*REPL* ，您可以通过仅使用`wes`启动脚本来执行直接在命令行上输入的脚本。

```shell
wes
```

接受脚本输入，直到您输入两个空白行。 *README.md*还可以使用*REPL*在*README.md*检查示例脚本的执行情况。

## 命令行命名参数

*wes*下面的命名变量被接受为*wes*启动选项。

| 命名                 | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--safe`           | 在安全模式下运行脚本           |
| `--usual`          | 在正常模式下运行脚本（默认）       |
| `--unsafe`         | 在不安全模式下运行脚本          |
| `--dangerous`      | 在危险模式下运行脚本           |
| `--debug`          | 在调试模式下运行脚本           |
| `--encoding=UTF-8` | 指定要首先读取的文件的编码。       |
| `--engine=Chakra`  | 此选项由*wes*自动添加        |

`--safe` `--usual` `--unsafe` `--dangerous`是不完整的，但是保留了命名参数。

## 内置对象

*wes*具有*JScript*没有的*built-in objects* 。

### 要求

使用*require*导入模块。 *wes*自动猜测模块文件的编码，但是如果您猜对的不正确，则可以使用第二个参数指定编码。

您也可以使用*require*的*OLE*导入，例如`require('WScript.Shell')` 。

```javascript
const WShell = require('WScript.Shell')
const ie = require('InternetExplorer.Application')
ie.Visible = true
ie.Navigate('https://google.com/')
while (ie.Busy || ie.readystate != 4) {
    WScript.Sleep( 100 )
}
WShell.AppActivate(ie.LocationName)
```

### 模块和module.exports

如果要将其定义为模块，则将其替换为`module.exports` 。

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### 安慰

*wes*在`WScript.Echo`和`WScript.StdErr.WriteLine`而不是*console*使用。

您可以使用`console.log`将字符输出到命令行。它还支持格式化的字符串。您可以使用格式运算符`%`指定格式字符串。

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes*为了输出彩色串`WScript.StdOut.WriteLine`而是`WScript.StdErr.WriteLine`使用。 `WScript.Echo`和`WScript.StdOut.WriteLine` `WScript.Echo`输出被阻止，请使用`WScript.StdOut.WriteLine`或`console.log` 。

### 缓冲

可以处理缓冲区。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### **目录**名**和**文件名

`__filename`存储当前正在执行的模块文件的路径。 `__dirname`存储`__filename`目录。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## 内置模块

*wes*具有*built-in modules* ，可简化和标准化基本处理。

### 安西

`ansi`包含*ANSI escape code* ，您可以更改标准输出的颜色和效果。颜色和效果可能会有所不同，具体取决于所使用的控制台应用程序的类型和设置。

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

您还可以使用`ansi.color()`或`ansi.bgColor()`创建自己的颜色。所述参数使用*RGB*如`255, 165, 0`或*color code*如`'#FFA500'` 。您不能使用`orange`等*color name* 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### 精油

获取命令行参数。 `cscript.exe`的命令行参数`/`声明了一个名为论据，但*wes*在`-`和`--`在声明命名参数。

*argv.unnamed*和*argv.named*将命令行参数的值类型*argv.named*转换为*String* *Number* *Boolean* 。

使用*REPL*输入命令行参数。

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

在*REPL*运行以下脚本。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### 路径名

操作路径。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### 文件系统

操作文件和目录。 `readTextFileSync`将猜测文件编码并读取它。

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### 脚本

如果将脚本引擎更改为*Chakra* ，则将无法使用特定于*JScript* *Enumerator* 。内置模块*JScript*使它们可用。但是， *Enumerator*返回一个*Array*而不是一个Enumerator对象。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject*替代`WScript.GetObject` 。

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### VB脚本

*VBScript*提供了*JScript*不具备的某些功能。

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### httprequest

*httprequest*是其名称， *http request*将发出一个。

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### 最小测试

*minitest*可以编写简单的测试。

```javascript
const { describe, it, assert } = require('minitest')

function add (a, b) {
  return a + b
}

describe( '# calc test', () => {
  it('add(2, 5) === 7', () => {
    assert(add(2, 5) === 7)
  })
})
```

### 管

*pipe*简化了管道处理

```javascript
const pipe = require('pipe')

function add (a, b) {
    return b + a
}

function sub (a, b) {
    return b - a
}

const add5 = add.bind(null, 5)
const sub3 = sub.bind(null, 3)

pipe()
  .use(add5)
  .use(sub3)
  .process(10, (err, res) => console.log('res: %O', res))
```

### 类型检查

判断脚本的类型。

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## 模块捆绑和安装

*install* ，您可以安装该模块*wes*上发布*github* 。要发布模块，您需要*github repository* 。另外，存储库名称和本地目录名称必须相同。

### 束

将模块发布到*github* ， *bundle*包捆绑必要的模块并将其更改为*install*模块可以包含的格式。

考虑到安全性， *wes*不会导入，可直接执行的模块，所以建立*.json*文件*bundle*模块。

捆绑模块有一些条件。

1.  在一个*repository*只能发布一种模块。
2.  *github*存储库名称和本地工作目录名称必须相同。
3.  如果要将模块发布给第三方，则存储库必须是公共的。
4.  *wes*不会静态地解释脚本，因此仅在某些条件下（例如， `if`语句可能未捆绑）才`require`模块。
5.  *.json*文件将在工作目录中创建，名称为*directory_name.json* 。如果更改文件名或移动文件，则无法安装。
6.  `node_modules/directory_name` ，绑定失败，因为它引用`directory_name.json` 。

### 安装

它用于为*github*发布的*wes*安装模块文件。

## 用法

传递参数以`@author/repository`格式*install*

```shell
wes install @wachaon/fmt
```

*install*有选项

| 命名         | 简称   | 描述                    |
| ---------- | ---- | --------------------- |
| `--bare`   | `-b` | 不要创建*@author*文件夹      |
| `--global` | `-g` | 将模块安装在*wes.js*所在的文件夹中 |

`--bare`选项可以省略`author@repository`到`repository`的`require`参数。 `--global`选项使安装的模块可用于所有脚本。以上选项必须用于与*wes*安全选项`--unsafe`或`--dangerous` 。

```shell
wes install @wachaon/fmt --bare --unsafe
```

# 安装私有存储库模块

*install*不仅可以安装在*github*的公共存储库模块中，还可以安装在私有存储库中。

*install* ，使用`author@repository`指定模块。该实现下载以下内容。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

当您使用浏览器访问私有存储库的*raw*时，会显示*token* ，因此请复制并使用*token* 。

如果在*token*有效时在命令行上运行模块，则也可以将模块安装在专用存储库中。

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## 外部模块

在这里，我们介绍一些外部模块。

### *@wachaon/fmt*

*@wachaon/fmt*是*@wachaon/fmt* *prettier*格式化脚本的文件。此外，处于已安装状态`SyntaxError` *@wachaon/fmt*可以在发生错误时显示错误位置。

#### 安装

```shell
wes install @wachaon/fmt
```

#### 用法

如果工作目录中存在*.prettierrc* （JSON格式），则将其反映在设置中。 *fmt*可以与*CLI* （命令行界面）和*module* 。

用作*CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| 匿名电话 | 描述             |
| ---- | -------------- |
| 0    | --             |
| 1个   | 需要。您要格式化的文件的路径 |

| 命名        | 简称   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允许覆盖 |

如果给定了`--write`或`-w`命名参数，则使用格式化的脚本覆盖文件。

#### 用作*module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| 参数名称      | 类型       | 描述            |
| --------- | -------- | ------------- |
| `source`  | `string` | 字符串格式         |
| `option?` | `object` | 传递给*prettier* |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```