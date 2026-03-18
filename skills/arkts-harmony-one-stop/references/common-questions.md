# ArkTS 常见问题速查

## 目录

- [如何处理 JSON.parse 返回值？](#如何处理-jsonparse-返回值)
- [如何定义对象类型？](#如何定义对象类型)
- [如何替代 globalThis？](#如何替代-globalthis)
- [如何处理 catch 中的错误类型？](#如何处理-catch-中的错误类型)
- [如何使用 Record 类型？](#如何使用-record-类型)
- [工厂函数如何替代构造签名？](#工厂函数如何替代构造签名)

## 如何处理 JSON.parse 返回值？

```typescript
// 错误
let data = JSON.parse(str);

// 正确（建议根据实际结构定义更精确类型）
let data: Record<string, Object> = JSON.parse(str);
```

## 如何定义对象类型？

```typescript
// TS 写法（ArkTS 不支持）
type Person = { name: string, age: number }

// ArkTS 写法
interface Person {
  name: string;
  age: number;
}

// 使用对象字面量
let p: Person = { name: 'John', age: 25 };
```

## 如何替代 globalThis？

```typescript
// 错误
globalThis.value = 'xxx';

// 使用单例模式
export class GlobalContext {
  private constructor() {}
  private static instance: GlobalContext;
  private _objects = new Map<string, Object>();

  public static getContext(): GlobalContext {
    if (!GlobalContext.instance) {
      GlobalContext.instance = new GlobalContext();
    }
    return GlobalContext.instance;
  }

  getObject(key: string): Object | undefined {
    return this._objects.get(key);
  }

  setObject(key: string, value: Object): void {
    this._objects.set(key, value);
  }
}
```

## 如何处理 catch 中的错误类型？

```typescript
// 错误
try {} catch (e: BusinessError) {}

// 正确
try {} catch (error) {
  let e: BusinessError = error as BusinessError;
}
```

## 如何使用 Record 类型？

```typescript
// TS 索引签名
function foo(data: { [key: string]: string }) {}

// ArkTS Record
function foo(data: Record<string, string>) {}

// 使用示例
let map: Record<string, number> = {
  'John': 25,
  'Mary': 21,
};
```

## 工厂函数如何替代构造签名？

```typescript
// TS 构造签名
type ControllerCtor = {
  new (value: string): Controller;
}

// ArkTS 工厂函数
type ControllerFactory = () => Controller;

class Menu {
  createController: ControllerFactory = () => {
    return new Controller('default');
  }
}
```
