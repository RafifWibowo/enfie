# ENFIE

Rest API for ENFIE (Electronic Nose for Incontinence Elderly) System

## GUIDE

After clone this repository, run this command:

```
npm install
```

Change the `.env.example` file to `.env` and change the contents to suit your database.

After that execute this command to create table to your database:

```
npm run initDb
```

Execute seeder:

```
npm run seed
```

Run server:

```
npm run dev
```

## Endpoint

| Method | End-Point    | Deskripsi                                             |
| ------ | ------------ | ----------------------------------------------------- |
| `GET`  | /device      | Mendapatakan semua informasi device                   |
| `GET`  | /data        | Mendapatakan semua data sensor                        |
| `POST` | /data        | Menambahkan data sensor                               |
| `GET`  | /temp/:id    | Mendapatkan data suhu berdasarkan id device           |
| `GET`  | /press/:id   | Menambahkan data tekanan berdasaran id device         |
| `GET`  | /enose/:id   | Menambahkan data enose berdasarkan id device          |
| `GET`  | /airqual/:id | Menambahkan data kualitas udara berdasarkan id device |

### Registrasi

Contoh

```
POST https://localhost:8080/data

{
    "suhu": 35,
    "tekanan": 10098,
    "e_nose": 25438,
    "kualitas_udara": 89376,
    "deviceId": 1
}
```
