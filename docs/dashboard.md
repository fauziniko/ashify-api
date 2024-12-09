# DASHBOARD API DOCUMENTATION

## GET DASHBOARD

**Method:** `GET`  
**Endpoint:** `/api/dashboard/{id_profile}`

### Request:

```json
Headers: Authorization Bearer Token
```

```json
{
  "dateTime": "DD-MM-YYYY"
}
```

### Response:

```json
{
  "revenue": 0,
  "expenses": 0,
  "net_margin": 0,
  "net_balance": 0,
  "hasil_prediksi": "Tidak ada prediksi pada bulan ini"
}
```
