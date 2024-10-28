# Node.js로 CRUD 애플리케이션 만들기

Node.js와 Express를 사용해 간단한 CRUD(Create, Read, Update, Delete) 애플리케이션을 구축하는 방법을 소개합니다. 기본적인 서버 설정부터 데이터베이스 연동, API 라우트 설정, CRUD 기능 구현까지 순차적으로 설명하며, 효율적인 웹 서버 개발을 위한 실용적인 팁을 제공합니다.

## 🤪 npm

npm(Node Package Manager)은 Node.js의 기본 패키지 관리 도구로, Node.js 프로젝트에 필요한 라이브러리와 모듈을 설치하고 관리하는 데 사용됩니다. 또한, 프로젝트 종속성과 설정을 기록하여 쉽게 재설치하고 업데이트할 수 있도록 합니다.

```
npm i
```

```json
{
  "name": "node-crud",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.1"
  }
}
```

## 🐶 express

```
npm i express
```

Express는 Node.js 환경에서 서버와 API를 쉽게 구축할 수 있도록 도와주는 웹 애플리케이션 프레임워크입니다. 심플하고 유연하며, Node.js의 비동기 처리 능력을 잘 활용하면서 빠르고 효율적인 웹 서버를 구축하는 데에 최적화되어 있습니다.
express를 설치하고 다음과 같이 작성합니다.

```js
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

## 👻 nodemon

nodemon은 Node.js 애플리케이션을 개발할 때 유용한 도구로, 파일이 수정될 때마다 자동으로 애플리케이션을 다시 시작해주는 기능을 제공합니다. 특히 서버 코드를 자주 수정해야 하는 개발 단계에서 매우 편리하게 사용할 수 있습니다.

```json
{
  "name": "node-crud",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.1"
  }
}
```

## 🥳 mongoDB

MongoDB는 JSON과 유사한 문서 기반의 NoSQL 데이터베이스로, 유연한 데이터 구조를 지원하며 특히 대규모 애플리케이션에 적합합니다. 관계형 데이터베이스와 달리 테이블, 행, 열 대신 컬렉션(collection)과 도큐먼트(document) 구조를 사용해 데이터를 관리합니다. 이를 통해 데이터 스키마를 자유롭게 설계하고 쉽게 확장할 수 있습니다.

```
npm i mongodb
```

```
npm i mongoose
```

```js
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

mongoose
  .connect(
    "mongodb+srv://webstupids:meiu08GCwCQQu04j@cluster0.5ynky.mongodb.net/node?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
```

## 🥶 dotenv

dotenv는 환경 변수를 파일로 관리할 수 있게 해주는 Node.js 라이브러리입니다. 보통 프로젝트의 루트 디렉토리에 .env 파일을 생성하고, 여기에 민감한 정보나 환경 설정 값을 저장하여 코드에서 쉽게 사용할 수 있게 합니다.

```
npm install dotenv
```

index.js 추가

```
require("dotenv").config();
```

## 🧑🏼‍💻 models

Mongoose의 Model은 MongoDB의 컬렉션(collection)을 나타내며, 데이터베이스에서 데이터를 조작하기 위해 사용하는 인터페이스입니다. 모델은 Mongoose 스키마를 기반으로 만들어지며, 이 스키마를 통해 데이터 구조를 정의하고, 다양한 CRUD 메서드를 사용할 수 있습니다. 모델을 통해 MongoDB와 상호작용하여 데이터를 쉽게 조회, 삽입, 수정, 삭제할 수 있습니다.

models 폴더에 post.js 파일을 만듭니다.

```js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
```

index.js 파일에 추가합니다.

```js
const Post = require("./models/post");

// 게시글 생성 (Create)
app.post("/api/post", async (req, res) => {
  try {
    const savedPost = await Post.create(req.body);
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 모든 게시글 조회 (Read)
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 게시글 조회 (Read)
app.get("/api/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 게시글 수정 (Update)
app.put("/api/post/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 게시글 삭제 (Delete)
app.delete("/api/post/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "글을 삭제했습니다." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

## MVC 패턴

MVC 패턴은 애플리케이션을 Model(모델), View(뷰), Controller(컨트롤러)로 구분하여 구조화하는 디자인 패턴입니다. 이 패턴을 사용하면 코드의 가독성, 유지보수성이 향상되고, 역할 분리가 명확해져 애플리케이션을 효율적으로 관리할 수 있습니다

```
project-root/
├── controllers/
│   └── post.js
├── models/
│   └── post.js
├── routes/
│   └── post.js
├── index.js
├── .env
└── package.json
```

## Router

라우터는 특정 경로(URL)에 요청이 들어왔을 때 해당 요청을 적절한 핸들러로 연결하는 역할을 합니다. Express에서는 express.Router를 사용해 라우트를 정의하고 관리할 수 있습니다. 라우터를 사용하면 애플리케이션의 경로들을 모듈화할 수 있어 코드가 깔끔해지고 관리가 쉬워집니다.

routes 폴더 생성 후 post.js 파일 생성

```js
const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

// 게시글 생성 (Create)
router.post("/", createPost);

// 모든 게시글 조회 (Read)
router.get("/", getPosts);

// 특정 게시글 조회 (Read)
router.get("/:id", getPost);

// 게시글 수정 (Update)
router.put("/:id", updatePost);

// 게시글 삭제 (Delete)
router.delete("/:id", deletePost);

module.exports = router;
```

conntrollers 폴더 생성 후 post.js 파일 생성

```js
const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const savedPost = await Post.create(req.body);
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "글을 삭제했습니다." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
```
