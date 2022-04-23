# Shopping mall API

## 데모 이미지

<p align='center'> <img src=''/></p>

<hr/>

## 배포 - AWS Elastic Beanstalk

> https://example.com

## 프로젝트 설명

<hr/>
범용적인 쇼핑몰에서 사용하는 API입니다.

## 기능

<hr/>

| API                          | 설명                                  |
| ---------------------------- | ------------------------------------- |
| 전체 상품 조회               | 등록된 모든 상품을 조회합니다.        |
| 상품을 생성                  | 상품을 등록합니다.                    |
| 상품 정보 수정               | 기존 상품의 정보를 수정합니다.        |
| 모든 상품 삭제 (admin)       | 등록된 모든 상품을 삭제합니다.        |
| 특정 상품 정보 조회          | 한개의 상품의 세부 정보를 조회합니다. |
| 특정 상품 삭제 (admin)       | 한개의 상품을 삭제합니다.             |
| 모든 주문 조회 (admin)       | 등록된 모든 주문을 조회합니다.        |
| 특정 주문 조회               | 한개의 주문 정보를 조회합니다.        |
| 주문 생성                    | 주문을 등록합니다.                    |
| 주문 정보 변경               | 기존 주문의 정보를 수정합니다.        |
| 모든 주문 삭제 (admin)       | 등록된 모든 주문을 삭제합니다.        |
| 주문의 세부사항 조회 (admin) | 등록된 주문의 세부사항을 조회합니다.  |
| 결제 정보 업데이트           | 결제 상태을 업데이트 합니다.          |
| 배달 상태 업데이트           | 배달 상태를 업데이트 합니다.          |
| 회원가입                     | 유저의 정보를 등록합니다.             |
| 로그인                       | 유저를 인증합니다.                    |
| 유저 프로필 조회             | 유저의 프로필을 조회합니다.           |
| 유저 프로필 업데이트         | 유저 프로필 정보를 변경 합니다.       |

## 기술 스택

<hr/>

### Infra

<table><tbody>
 <tr>
  <td>
    <div align="center"><a href="https://aws.amazon.com/" target="_blank">
    <img src="https://simpleicons.org/icons/amazonaws.svg" width="40" height="40" style="filter: invert(14%) sepia(17%) saturate(1249%) hue-rotate(173deg) brightness(95%) contrast(88%);"/> </a><br>Amazon AWS</div>
  </td>
  <td>
  <div align="center"><a href="https://docker.com" target="_blank">
    <img src="https://simpleicons.org/icons/docker.svg" width="40" height="40" style="filter: invert(45%) sepia(98%) saturate(1566%) hue-rotate(182deg) brightness(97%) contrast(92%);"/> </a><br>Docker</div>
  </td>
  <td>
    <div align="center"><a href="https://git-scm.com/" target="_blank">
    <img src="https://simpleicons.org/icons/git.svg" width="40" height="40" style="filter: invert(44%) sepia(62%) saturate(4423%) hue-rotate(344deg) brightness(99%) contrast(91%);"/> </a><br>Git</div>
  </td>
 </tr>
</tbody></table>

### Back-end

<table><tbody>
  <tr>
    <td>
      <div align="center"><a href="https://expressjs.com" target="_blank">
      <img src="https://simpleicons.org/icons/express.svg" width="40" height="40" style="filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%);"/> </a><br>Express</div>
    </td>
    <td>
      <div align="center"><a href="https://developer.mozilla.org/ko/docs/Web/JavaScript" target="_blank">
      <img src="https://simpleicons.org/icons/javascript.svg" width="40" height="40" style="filter: invert(81%) sepia(100%) saturate(3849%) hue-rotate(336deg) brightness(97%) contrast(99%);"/> </a><br>JavaScript</div>
    </td>
    <td>
      <div align="center"><a href="https://www.linux.org/" target="_blank">
      <img src="https://simpleicons.org/icons/linux.svg" width="40" height="40" style="filter: invert(77%) sepia(96%) saturate(1529%) hue-rotate(337deg) brightness(101%) contrast(98%);"/> </a><br>Linux</div>
    </td>
    <td>
      <div align="center"><a href="https://nodejs.org" target="_blank">
      <img src="https://simpleicons.org/icons/nodedotjs.svg" width="40" height="40" style="filter: invert(43%) sepia(91%) saturate(416%) hue-rotate(70deg) brightness(95%) contrast(84%);"/> </a><br>Node.js</div>
    </td>
  </tr>
</tbody></table>

### Database

 <table><tbody>
  <tr>
    <td>
      <div align="center"><a href="https://www.mongodb.com/" target="_blank">
      <img src="https://simpleicons.org/icons/mongodb.svg" width="40" height="40" style="filter: invert(56%) sepia(48%) saturate(553%) hue-rotate(71deg) brightness(88%) contrast(86%);"/> </a><br>MongoDB</div>
    </td>
  </tr>
 </tbody></table>

### Docs

 <table><tbody>
  <tr>
    <td>
      <div align="center"><a href="https://swagger.io/" target="_blank">
      <img src="https://simpleicons.org/icons/swagger.svg" width="40" height="40" style="filter: invert(78%) sepia(43%) saturate(797%) hue-rotate(39deg) brightness(101%) contrast(89%);"/> </a><br>Swagger</div>
    </td>
  </tr>
 </tbody></table>

## 프로젝트 실행 방법

<hr/>

#### 사전 요구사항:

- <a href="https://docker.com">Docker</a>가 필요합니다.
- .env파일을 생성하여 MONGODB_URL 설정해야 합니다.

<pre>
# 프로젝트를 클론합니다.
$ git clone https://github.com/ginami0129/Shopping-mall-api

# 프로젝트 폴더로 이동합니다.
$ cd Shopping-mall-api

# Docker 이미지를 빌드합니다.
$ docker build -f Dockerfile -t shopping-mall-api .

# 빌드한 Docker 이미지를 실행합니다.
$ docker run -d -p 8080:8080 shopping-mall-api
</pre>

<a href="https://localhost:8080/">https://localhost:8080/api/docs</a> 로 접속하여 확인합니다.
