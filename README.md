# @dogewallet/cli

dogewallet 命令行工具，可以用来：
 - 批量生成钱包
 - 使用指定的密钥对钱包进行加密
 - 使用特定的密钥对钱包进行解密
 - 从已知的助记词中推导出对应的地址和私钥

所有的这一切，都是**离线**的，并不会联网。 输入与输出文件，是相对于当前目录下的 `output` 目录，此目录会自动创建。


## 1 生成钱包

使用 `dogewallet gen` 命令可以批量生成若干条钱包记录。

### 1.1 用法

`dogewallet gen [count] --mnemonic`

参数：
 - `[count]`，可选， 要生成的记录数。
    默认为 1，此时仅在控制台输出，不生成文件。 
    只有大于 1 时才生成到文件。 
    目标文件在 `output` 目录，以当前日期和时间为主文件名，以 `.s.txt` 为结尾，如 `20240621-102241.s.txt`

 - `--mnemonic` 或 `-m` 是否只生成助记词，不生成地址和私钥。
    如果打开此开关，则只生成助记词（12个单词）。

### 1.2 示例

 - `dogewallet gen` 生成 1 个钱包，包含地址、私钥、公钥、助记词。

会在控制台输出类似这样的结果：

``` js
{
  address: 'DCE9LNx8NyqSr28KXyX9Jfj9vwBSdMtvcv',
  privateKey: 'QQQfCwHjwNE9ssDxTo91owtadwZ9eWeCSrQEzWm6wmfWiVrCE4Ff',
  publicKey: '03362278c4c32fe48c0eb6f15ed11b178bf4b479cc734be125acbb0212d21c1a36',
  mnemonic: 'fault deer voyage seat excess organ settle impulse loan bid install flush'
}
```

 - `dogewallet gen 5` 生成 5 条钱包记录，每条记录含有地址、私钥、助记词。


 生成的文件内容类似如下结构：

 ```
DR7NAtjb5Kxce78aNdWYhz9JAaRof4shgw QQnq3FrLJo6J2EXtPsHXvTVjnSyeLJ5ZN6iHV1FNTULExHoPDpko race person salad trust bottom kiss merit sell street jeans trick patrol
D9Kg3V54aZzYmigJPyydBSAcksompzFypm QR5X3qsMuyMqW2eWfW1rwqVH4Vh6dSGQHpUMGmwDRGXxL3UZu56v express old fiction battle reward glide old width enact core magic patrol
DCUpQjn2rpCg9FyQoQGj4UHw8QbyWj2JaH QNioVaL7DC6rjsKmbzBzjk6pWWpN9bxKAgNGzqbMnW25P8CdRqmX village proud pilot orient ginger rural ocean material lamp turn cheese alarm
DPd98XeYuXPbGjmDeit3GjPBo3b6N1j1RF QSjanp2iGwqTyrTngsg3TSGYbvtTbE55Gt6n1KB9YWxMwGkp6TEE term raise casino strike erosion prize enough fence tilt wood degree ice
D6pzd7hWJ23AkFrUKaYs1DGnfMgW3T4CM4 QTDSacXHeC8XaiWzQqB9PxB9DJ4t45SLMByd62sNhYMHq5rywZV8 demise biology define input lake catch violin cannon woman cube april sight

 ```

 - `dogewallet gen 5 -m` 生成 5 条钱包记录，每条记录只含有助记词（12个单词）。
  
  生成的文件内容类似如下结构：

```
run hire regret cup lady tuna bike remind blouse palm coconut vocal
estate stage banana farm chapter arm curtain venture high umbrella engine dad
tiger minor foam flame crunch chunk swarm affair any explain raise repeat
budget boost excess defy cat castle decrease month police supply craft canal
crisp enjoy indicate drink park tribe under clean number slot narrow student

```

## 2 加密文件

使用命令 `dogewallet encrypt` 可以对明文存储的钱包记录源文件进行加密。

### 2.1 用法

`dogewallet encrypt <source-file> <secret-key>`

参数：

 - `<source-file>` 必选，明文存储的钱包记录源文件。
 - `<secret-key>` 必选，16位字符的密钥（**请妥善保管，解密时要用到**）。

 **请注意，16 位密钥请务必妥善保管，且不要泄漏出去，解密时要用到此密钥。**

 ### 2.2 示例

 - `dogewallet encrypt 20240621-102241.s.txt mysecretkey12345`
  
   以密钥 `mysecretkey12345` 对文件 `20240621-102241.s.txt` 进行加密，并输出 `output/20240621-102241.e.txt` 文件。

## 3 解密文件
使用 `dogewallet decrypt` 命令可以对加密后的钱包源文件进行解密。

### 3.1 用法

`dogewallet decrypt <encrypt-file> <secret-key>`

参数：
 - `<encrypt-file>` 必选，加密后的钱包源文件名。
 - `<secret-key>` 必选，16位字符的密钥（加密时所使用的密钥）。

### 3.2 示例

 - `dogewallet decrypt 20240621-102241.e.txt mysecretkey12345` 
  
  以密钥 `mysecretkey12345` 对文件 `20240621-102241.s.txt` 进行解密，并输出 `output/20240621-102241.d.txt` 文件。

## 4 解析助记词

使用 `dogewallet mnemonic` 命令可以从助记词中解析出地址和私钥。

### 4.1 用法

`dogewallet mnemonic <mnemonic>|<source-file>`

参数：

 - `<mnemonic>` 必选，助记词，由空格隔开的 12 个单词组成。
 - `<source-file>` 必选，要进行解析和转换的钱包记录源文件名。

### 4.2 示例

 - `dogewallet mnemonic race person salad trust bottom kiss merit sell street jeans trick patrol`
  解析助记词 `race person salad trust bottom kiss merit sell street jeans trick patrol`，输出对应的地址和私钥，此时仅在控制台输出，不会生成文件。

  控制台输出：
  ``` js
    {
        address: 'DR7NAtjb5Kxce78aNdWYhz9JAaRof4shgw',
        privateKey: 'QQnq3FrLJo6J2EXtPsHXvTVjnSyeLJ5ZN6iHV1FNTULExHoPDpko',
        publicKey: '03ada28f12417f1e6941ecf6e81fcacc917bc3b91701d03ec7a7bd143b17612737',
        mnemonic: 'race person salad trust bottom kiss merit sell street jeans trick patrol'
    }
  ``` 

 - `dogewallet mnemonic 20240621-111750.s.txt`
  从文件 `20240621-111750.s.txt` 中进行助记词解析，输出含有地址、私钥、助记词三个字段的记录输出到文件 `20240621-111750.m.txt`。