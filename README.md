## About this app
Next.js製のチャットアプリのデモです。
リアルタイムな通信(websocket)の実装とサーバーレスのインフラへの理解を深めることを目的に開発しています。
This is a chat app with Next.js to learn how to build application with websocket and severless services.

<img src="https://user-images.githubusercontent.com/54468945/232225632-704929e5-7fe0-4ca7-8a28-77899e0be74c.png" width="49%"> <img src="https://user-images.githubusercontent.com/54468945/232225662-14bda94a-a065-4879-b2bd-4e41dd4e3885.png" width="49%">

## Status
🔧開発中・・・

- Frontend
  - 最低限の動作はする状態
  - 画面が動作するだけでデータの永続化は行っていません。
- Backend
  - 仮実装
    - メッセージ履歴API
      - Next.jsのAPI Routesで仮実装
      - `/rooms/f41ce51e-4c7e-8f57-ebeb-3e8091a9cb11`のみデータを返す
    - websocket
      - `ws://localhost:8080/socket`に接続(データ型は仮)
      - デフォルトのNext.jsでは実装できないため各自で実装が必要
      - 再接続は未実装
  - 未実装
    - ルーム名取得API
    - 新規ルーム作成API
    - メッセージの永続化


## Installation
Next.jsの開発サーバーだけで動作可能です。
実際にリアルタイムなチャットを行いたい場合はwebsocketサーバーを用意してください。

```shell
# パッケージのインストール
npm install

// 開発サーバーの起動(http://localhost:3000)
# npm run dev
```
