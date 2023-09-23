# ENFIE

Rest API for ENFIE (Electronic Nose for Incontinence Elderly) System

## GUIDE

After clone this repository, run this command

```
npm install
```

Change the `.env.example` file to `.env` and change the contents to suit your database.

After that execute this command to create table to your database:

```
npm run initDb
```

### Execute seeder

```
npm run seed
```

### Run server

```
npm run dev
```

## Dokumentasi

### Endpoint

| Method | End-Point      | Deskripsi                   | auth  |
| ------ | -------------- | --------------------------- | ----- |
| `GET`  | /user          | Mendapatakan informasi user | True  |
| `POST` | /user/register | Mendaftarkan User           | False |
| `POST` | /user/login    | Login User                  | False |
| `POST` | /patient       | Mendaftarkan Pasien         | True  |
| `GET`  | /patient       | Mendapatkan data Pasien     | TRUE  |
| `POST` | /data          | mengirimkan data sensor     | FALSE |
| `GET`  | /data          | Mendapatkan data Sensor     | TRUE  |

### Example

```json
POST https://{domain}/user/register
Bearer Token: -

Body {
    "name": "string",
    "email": "...@gmail.com",
    "password": "String123",
}

Response {
    "status": " ",
    "message": " "
}
```

```json
POST https://{domain}/user/login
Bearer Token: -

Body {
    "email": "...@gmail.com",
    "password": "String123",
}

Response {
    "status": " ",
    "message": " ",
    "data": "token"
}
```

```json
POST https://{domain}/user
Bearer Token: token

Body {

}

Response [
    {
        "id": ,
        "name": " ",
        "email": " ",
        "password": " ",
            "is_admin":
    }
]
```

```json
POST https://{domain}/patient
Bearer Token: token

Body {
    "name": " ",
    "birth": "YYYY-MM-DD",
    "gender": boolean,
    "address": " "
}

Response {
        "status": "success",
        "message": "patient data inserted"
}
```

```json
GET https://{domain}/patient
Bearer Token: token

Body {

}

Response [
    {
        "id": ,
        "name": " ",
        "user_id": ,
        "birth": " ",
        "gender": ,
        "address": " "
    },
    {
        "id": ,
        "name": " ",
        "user_id": ,
        "birth": " ",
        "gender": ,
        "address": " "
    },
    {

    },
    {

    }
]
```

```json
POST https://{domain}/data
Bearer Token: -

Body {
    "suhu": float,
    "humidity": float,
    "voc": float,
    "patient_id": int
}

Response {
    "status": "success",
    "message": "Data created"
}
```

```json
POST https://{domain}/data
Bearer Token: Token

Body {
    "patient_id": int
}

Response {
    "status": "success",
    "message": "Berhasil mengambil data",
    "data": [
        {
            "suhu": 30,
            "humidity": 50,
            "voc": 32000
        },
        {
            "suhu": 37.6,
            "humidity": 37.5,
            "voc": 41.5
        },
        {
            "suhu": 37.7,
            "humidity": 39.6,
            "voc": 36.8
        },
        {
            "suhu": 42.8,
            "humidity": 39,
            "voc": 40.7
        },
        {
            "suhu": 37.2,
            "humidity": 39.3,
            "voc": 37.6
        }
    ]
}
```
