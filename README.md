# :family: TravelUs

<p align="left">
  <img src="https://github.com/user-attachments/assets/ad486451-9552-44bb-bad9-486cb75bac27" width="600">
</p>

### AI 기술 기반의 해외여행 모임통장 서비스
- 배포 링크: https://j11d209.p.ssafy.io
- 모바일 기반의 PWA를 적용한 어플리케이션이기 때문에 모바일 환경에서 사용을 권장합니다.

## :calendar: 기간

- 2024.08.19 ~ 2024.10.11

## 목차

1. :golf: **프로젝트 소개**

2. :star: **주요 기능**

3. :closed_book:**시스템 아키텍처**

4. :file_folder: **기술 스택**

5. :pencil: **ERD**

6. 💻 **빌드 및 실행방법**

7. :tv: **구현 화면(사용 플로우)**
   
   :one: 회원가입 및 로그인
   :two: 메인 페이지
   :three: 통장 개설
   :four: 모임원 관리
   :five: 환율 및 환율 예측 조회
   :six: 머니로그
   :seven: 지출 정산

9. :+1: **멤버**

## :golf: 프로젝트 소개

#### 희망 환율에 자동 환전 기능을 제공하는 외화 모임 통장과, 해외여행 시 다양한 부가 혜택을 누릴 수 있는 혁신적인 금융 서비스

#### 환율 예측 추천 서비스에 따라 사용자가 원하는 시점에 환전이 가능하며, 가계부 및 자동 정산 기능을 통해 여행 이후에 돈 관리를 손쉽게 관리가 가능하게 함

## :star: 주요 기능

### 모임 통장에 돈을 모아 희망환율에 자동으로 외화저금통에 환전이 되는 서비스

### 여행 중에 지출 내역을 한 눈에 볼 수 있는 '머니로그'

### 여행 이후에는 개별 지출에 대한 정산로직을 구현하여 정산

## :closed_book:시스템 아키텍처
<p align="left">
  <img src="https://github.com/user-attachments/assets/1d11f179-deeb-4c72-8b00-f2200b6c969f" width="900">
</p>

## :file_folder: 기술 스택

##### FrontEnd

- React

- Redux

- Javascript

- Node.js

- Tailwind.css

- MUI

- daisyUI

---

##### BackEnd

- Sping

- Spring Security

- JWT

- JPA

- QueryDsl

-----

##### DB

- MySql

- Redis

- S3

---



##### Infra

- Jenkins

- Docker

- DockerHub

- Nginx

- EC2

-----

## :pencil: ERD
<p align="left">
  <img src="https://github.com/user-attachments/assets/0607e50c-b301-41d3-bf31-a7a469d1f239" width="800">
</p>


## :tv: 구현 화면

### :one: 회원가입 및 로그인
<table>
  <tr>
    <td align="center"><b>회원가입</b></td>
    <td align="center"><b>주소 입력</b></td>
    <td align="center"><b>로그인</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/3839c68f-93bb-4c24-95e4-5bae765417f8" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/cc3aa7f3-047f-40d1-a9af-8d673d203be6" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/47c0135e-11f3-419b-81fd-8008f0fe0d5d" width="200"></td>
  </tr>
</table>

### :two: 메인 페이지
<table>
  <tr>
    <td align="center"><b>최초 입장 메인</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c445eaba-2c8a-4010-9781-d6bd3a75a5fd" width="200"></td>
  </tr>
</table>

### :three: 통장 개설
<table>
  <tr>
    <td align="center"><b>입출금 통장 개설</b></td>
    <td align="center"><b>모임 통장 개설</b></td>
    <td align="center"><b>외화저금통 생성</b></td>
    <td align="center"><b>희망 환율 설정</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/ef591f3e-dacd-4438-8d5c-862735675613" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/3a236373-86e1-4484-b229-a4f410bdbfad" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/78d18599-1f96-483a-b115-94e50449d5e4" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/37cce4b9-19a5-4ae0-98dc-7dea092f8888" width="200"></td>
  </tr>
</table>

### :four: 모임원 관리
<table>
  <tr>
    <td align="center"><b>모임원 관리</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/9eb109ef-b103-45df-96a0-565b68249562" width="200"></td>
  </tr>
</table>

### :five: 환율 및 환율 예측 조회
<table>
  <tr>
    <td align="center"><b>환율 및 환율 예측 조회</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/ba354116-a5fe-43b5-afa8-ae06600e53ee" width="200"></td>
  </tr>
</table>

### :six: 머니로그
<table>
  <tr>
    <td align="center"><b>머니로그 조회</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/b296b054-762f-4ec2-bd82-0fdb3e2ff5d2" width="200"></td>
  </tr>
</table>

### :seven: 지출 정산
<table>
  <tr>
    <td align="center"><b>개별 지출 정산</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/df9bb590-d6f5-4c9e-927f-2aa30439a101" width="200"></td>
  </tr>
</table>

## :+1: 멤버
<table>
  <tr>
    <td align="center"><b>멤버 1</b></td>
    <td align="center"><b>멤버 2</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8c5ca174-08b0-4da2-8f17-06d66519776f" width="500"></td>
    <td><img src="https://github.com/user-attachments/assets/eee2f7be-8b77-41ff-9741-67500d65ae49" width="500"></td>
  </tr>
</table>
