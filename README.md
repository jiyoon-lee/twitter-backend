# Twitter Backend Server
- twitter 클론코딩을 통해 Node.js를 학습하여 봅시다.
- MVC pattern을 사용
  - app.js가 시작점
  - app.js에서 router폴더로 요청에 맞게 전달
  - 요청의 맞게 router이 받으면 controller을 호출
  - controller는 수뇌부와 같은 로직을 처리. 
    - DB와 관련한 처리는 data폴더의 repository에 역임

참고: https://academy.dream-coding.com/courses/node

## 주요기능
- 사용자 
  - 로그인(post: /login)
  - 로그아웃(post: /logout)
  - 정보 불러오기(get: /me)
- tweet 작성, 조회, 수정, 삭제
  - 조회(get: /, /:id)
  - 작성(post: /)
  - 수정(put: /:id)
  - 삭제(delete: /:id)

## 사용기술
- bcrypt
  - 비밀번호를 암호화해서 저장하기 위해 사용
- cors
  - 브라우저를 통해 프런트와 통신하기 위해
- dotenv
  - 공개되어서는 안되는 키 또는 환경에 따라 달라지는 값을 보관하기 위해 사용
- express
  - helmet
  - morgan
  - express-async-errors
  - express-validator
- jsonwebtoken
  - 토큰 발급은 위해 사용
- uuid
  - tweet의 uniqueId 저장을 위해 사용
- mysql2, Sequelize(ORM library)
- socket.io
