# 税务申报

读取文件夹中所有文件，从文件名中获取相关数据并生成csv文件，用于税务申报。

文件名格式：

```
# 日期-时间-价格x计算比例-类型-描述.jpg
yyyyMMdd-HHmmss-10000x0.5-类型-描述.jpg
# 日期-时间-价格x分期信息1/3-类型-描述.jpg
yyyyMMdd-HHmmss-10000x1_3-类型-描述.jpg
```

## 使用

```bash
npm run start
```
