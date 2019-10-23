# Server Docs

## Tables
1. Users
    - id INT PRIMARY KEY
    - email VARCHAR(45)
    - name VARCHAR(10)
    - avatar VARCHAR(255)
    - authorization ENUM('none', 'user', 'manager', 'god')

2. Books
    - img_url VARCHAR(255)
    - title VARCHAR(255)
    - author VARCHAR(255)
    - publisher VARCHAR(255)
    - isbn VARCHAR(255)
    - desc VARCHAR(255)

3. Serials
    - id INT

4. RentStatus
    - id INT
    - rent_time DATETIME
    - return_time ALLOW NULL

5. Requests
    - img_url VARCHAR(255)
    - title VARCHAR(255)
    - author VARCHAR(255)
    - publisher VARCHAR(255)
    - isbn VARCHAR(255)
    - desc VARCHAR(255)

## 시나리오
1. 책을 요청하는 경우
    1. 책을 user client 에서 요청하면 Requests Table 에 등록
    2. 책 구매가 완료된 경우 manager client 에서 상태를 변경할 때
        - Requests Table 에서 **삭제**하고
        - Books 에 **등록**하고
        - 등록된 책의 부수만큼 Serials 에 **추가**한다.