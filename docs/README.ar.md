# WES

*wes* هو إطار عمل لتنفيذ *ECMAScript* على *Windows Script Host*

## المميزات

-   قم بتغيير محرك البرنامج النصي إلى *Chakra* وقم بتمكين تنفيذ *ECMAScript2015* *Chakra*
-   *cscript.exe* 32 بت ، لذلك يتجنب الأخطاء الغريبة في بيئة 64 بت
-   يمكنك استيراد الوحدة مع `require`
-   يمكن إخراج الأحرف الملونة إلى الإخراج القياسي
-   تخمين ملف ترميز تلقائيا

## الميزات لم تحل

-   لا يمكن لـ `WScript.Quit` مقاطعة البرنامج ولا يُرجع رمز خطأ
-   المعالجة غير المتزامنة
-   استخدام *event prefix* للوسيطة الثانية من `WScript.CreateObject`

## تثبيت

*wes* حاجة غير *wes.js* الملف الوحيد. للتنزيل ، ابدأ موجه الأوامر وأدخل الأمر التالي.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* في وقت التنفيذ كما تنفيذ *WScript.Shell* من `SendKeys` استخدام. *wes.js* مسار الدليل الذي تم حفظ *wes.js* فيه يحتوي على أحرف أخرى غير *ascii* ، فلن ترسله `SendKeys` بشكل صحيح ولن يتم تشغيل البرنامج النصي. في هذه الحالة ، يرجى تكوين المسار لحفظ *wes.js* باستخدام *ascii* فقط.

## إستعمال

في سطر الأوامر ، حدد الملف الذي يمثل نقطة بداية البرنامج بعد `wes` . يمكن حذف ملحق البرنامج النصي *.js* .

```shell
wes index
```

أيضًا ، نظرًا لأن *wes* لديه *REPL* ، يمكنك تنفيذ برنامج نصي تم إدخاله مباشرة في سطر الأوامر عن طريق بدء تشغيله فقط مع `wes` .

```shell
wes
```

يتم قبول إدخال البرنامج النصي حتى تقوم بإدخال سطرين فارغين. *README.md* أيضًا التحقق من تنفيذ نموذج البرنامج النصي في *README.md* باستخدام *REPL* .

## سطر الأوامر المسمى الحجج

يتم قبول الوسائط المسماة التالية كخيارات بدء تشغيل *wes* .

| اسم الشيئ          | وصف                                                |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | القضاء على *ANSI escape code*                      |
| `--safe`           | قم بتشغيل البرنامج النصي في الوضع الآمن            |
| `--usual`          | قم بتشغيل البرنامج النصي في الوضع العادي (افتراضي) |
| `--unsafe`         | قم بتشغيل البرنامج النصي في الوضع غير الآمن        |
| `--dangerous`      | قم بتشغيل البرنامج النصي في الوضع الخطير           |
| `--debug`          | قم بتشغيل البرنامج النصي في وضع التصحيح            |
| `--encoding=UTF-8` | حدد ترميز الملف المراد قراءته أولاً.               |
| `--engine=Chakra`  | يتم إضافة هذا الخيار تلقائيًا بواسطة *wes*         |

تنفيذ - `--safe` `--usual` `--unsafe` `--dangerous` غير مكتمل ، لكن الحجج المسماة محفوظة.

## كائنات مدمجة

يحتوي *wes* *built-in objects* *JScript* لا تحتوي عليها *JScript* .

### تطلب

استيراد وحدة مع *require* . *wes* تلقائيًا بتخمين تشفير ملف الوحدة النمطية ، ولكن إذا لم تخمنه بشكل صحيح ، فيمكنك تحديد الترميز باستخدام الوسيطة الثانية.

يمكنك أيضًا الاستيراد باستخدام *require* لـ *OLE* مثل `require('WScript.Shell')` .

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

### وحدة و وحدة الصادرات

إذا كنت تريد تعريفها كوحدة نمطية ، `module.exports` في `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### وحدة التحكم

استخدم *wes* في `WScript.Echo` و `WScript.StdErr.WriteLine` بدلاً من *console* .

يمكنك إخراج الأحرف إلى سطر الأوامر باستخدام `console.log` . كما يدعم السلاسل المنسقة. يمكنك استخدام عامل التنسيق `%` لتحديد سلسلة تنسيق.

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* لإخراج سلسلة ملونة في `WScript.StdOut.WriteLine` بدلاً من ذلك ، استخدم `WScript.StdErr.WriteLine` . `WScript.Echo` إخراج `WScript.Echo` و `WScript.StdOut.WriteLine` محظور ، استخدم `WScript.StdOut.WriteLine` أو `console.log` .

### متعادل

يمكن التعامل مع المخازن المؤقتة.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### **dirname واسم**

`__filename` يخزن مسار ملف الوحدة النمطية الجاري تنفيذه حاليًا. `__dirname` يخزن `__filename` الدليل.

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## وحدات مدمجة

يحتوي *wes* *built-in modules* لتبسيط وتوحيد المعالجة الأساسية.

### ansi

يحتوي `ansi` على *ANSI escape code* ، ويمكنك تغيير لون الناتج القياسي وتأثيره. قد تختلف الألوان والتأثيرات وفقًا لنوع وإعدادات تطبيق وحدة التحكم المستخدمة.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

يمكنك أيضًا إنشاء اللون الخاص بك باستخدام `ansi.color()` أو `ansi.bgColor()` . تستخدم الوسيطات *RGB* مثل `255, 165, 0` أو `255, 165, 0` أو *color code* مثل `'#FFA500'` . لا يمكنك استخدام *color name* مثل `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### أرجف

يحصل على وسيطات سطر الأوامر. `cscript.exe` وسيطات سطر الأوامر لـ `/` تعلن عن الوسائط المسماة في ولكن ، يعلن *wes* in `-` and `--` عن الوسائط المسماة في.

*argv.unnamed* و *argv.named* يلقي نوع قيمة وسيطة سطر الأوامر إلى أحد *String* *Number* *Boolean* .

أدخل وسيطات سطر الأوامر باستخدام *REPL* .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

قم بتشغيل البرنامج النصي التالي في *REPL* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### اسم المسار

تشغيل المسار.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### نظام الملفات

يدير الملفات والدلائل. سيقوم `readTextFileSync` بتخمين تشفير الملف وقراءته.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### JScript

إذا قمت بتغيير محرك البرنامج النصي إلى *Chakra* ، فلن تتمكن من استخدام *Enumerator* الخاصة بـ *JScript* . وحدة *JScript* المدمجة تجعلها متاحة. ومع ذلك ، يقوم *Enumerator* بإرجاع *Array* بدلاً من كائن Enumerator.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

`WScript.GetObject` *GetObject* كبديل لـ `WScript.GetObject` .

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### VBScript

يقدم *VBScript* بعض الميزات التي لا تتوفر في *JScript* .

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### طلب http

*httprequest* كما سيصدر *http request* اسمها.

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### أصغر

*minitest* يمكنه كتابة اختبارات بسيطة.

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

### يضخ

*pipe* يبسط تجهيز الأنابيب

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

### فحص نوع

احكم على نوع السيناريو.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## حزمة الوحدة النمطية والتثبيت

*install* ، يمكنك تثبيت وحدة ل *wes* نشرت يوم *github* . لنشر الوحدة ، تحتاج إلى *github repository* . أيضًا ، يجب أن يكون اسم المستودع واسم الدليل المحلي متماثلين.

### حزمة

*github* نشر وحدة ل *github* ، *bundle* حزم الوحدات اللازمة وتغير قبل أن تتحول إلى شكل يمكن أن يدرج من قبل *install* وحدة.

في النظر في السلامة، *wes* لا تستورد الوحدة النمطية التي يمكن تنفيذها مباشرة، لذلك إنشاء *.json* الملف في *bundle* حدة.

هناك بعض الشروط لتجميع الوحدات.

1.  يمكن نشر نوع واحد *repository* من الوحدات في *repository* واحد.
2.  يجب أن يكون اسم مستودع *github* واسم دليل العمل المحلي *github* .
3.  يجب أن يكون المستودع عامًا إذا كنت تريد نشر الوحدة إلى جهة خارجية.
4.  لا يفسر *wes* بشكل ثابت ، لذلك الوحدات التي `require` فقط في ظل ظروف معينة مثل عبارات `if` قد لا تكون مجمعة.
5.  سيتم إنشاء ملف *.json* في دليل العمل بالاسم *directory_name.json* . إذا قمت بتغيير اسم الملف أو نقل الملف ، فلا يمكنك تثبيته.
6.  `node_modules/directory_name` ، يفشل التجميع لأنه يشير إلى `directory_name.json` .

### تثبيت

يتم استخدامه لتثبيت ملف الوحدة النمطية لـ *wes* المنشور على *github* .

## الاستخدام

قم بتمرير الوسائط *install* بالتنسيق `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* لديه خيارات

| اسم الشيئ  | اسم قصير | وصف                                                  |
| ---------- | -------- | ---------------------------------------------------- |
| `--bare`   | `-b`     | لا تقم بإنشاء مجلد *@author*                         |
| `--global` | `-g`     | قم بتثبيت الوحدة النمطية في المجلد حيث يوجد *wes.js* |

يمكن أن يحذف الخيار `--bare` الوسيطة `require` من `author@repository` إلى `repository` . يجعل الخيار `--global` الوحدة النمطية المثبتة متاحة لجميع البرامج النصية. يجب استخدام الخيارات أعلاه مع *wes* الخيار الأمني `--unsafe` أو `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# قم بتثبيت وحدة المستودع الخاص

*install* يمكن تركيبها ليس فقط في وحدة مستودع العامة *github* ولكن أيضا في المستودع الخاص.

*install* ، حدد الوحدة مع `author@repository` . يقوم التطبيق بتنزيل ما يلي.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

عندما تصل إلى النسخة *raw* من المستودع الخاص باستخدام متصفح ، يتم عرض *token* ، لذا انسخ *token* .

يمكنك أيضًا تثبيت الوحدات النمطية في مستودعك الخاص إذا قمت بتشغيلها على سطر الأوامر بينما يكون *token* صالحًا.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## الوحدة الخارجية

نقدم هنا بعض الوحدات الخارجية.

### *@wachaon/fmt*

*@wachaon/fmt* عبارة عن حزمة *prettier* تقوم *@wachaon/fmt* النص. بالإضافة إلى ذلك ، يمكن لـ *@wachaon/fmt* في حالة تم تثبيتها `SyntaxError` تقديم موقع الخطأ عند حدوثه.

#### تثبيت

```shell
wes install @wachaon/fmt
```

#### الاستخدام

إذا كان هناك تنسيق *.prettierrc* (تنسيق JSON) في دليل العمل ، *.prettierrc* في الإعداد. يمكن استخدام *fmt* مع كل من *CLI* (واجهة سطر الأوامر) *module* .

استخدام *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| رقم غير مسمى | وصف                                |
| ------------ | ---------------------------------- |
| 0            | -                                  |
| 1            | مطلوب. مسار الملف الذي تريد تنسيقه |

| اسم الشيئ | اسم قصير | وصف             |
| --------- | -------- | --------------- |
| `--write` | `-w`     | السماح بالكتابة |

`--write` فوق الملف ببرنامج نصي منسق إذا أعطيت وسيطة باسم `--write` or `-w` .

#### *module* استخدامها كوحدة *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| اسم الحجة | اكتب     | وصف                            |
| --------- | -------- | ------------------------------ |
| `source`  | `string` | سلسلة للتنسيق                  |
| `option?` | `object` | خيارات لتمريرها إلى *prettier* |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```