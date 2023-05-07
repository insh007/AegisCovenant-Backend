# Make sure to check Frontend Repository :
https://github.com/insh007/AegisCovenant---Frontend

# Current Backend Repository :
https://github.com/insh007/AegisCovenant-Backend

# Deploy Backend Link :
https://ages-covenant-api.onrender.com

# Deploy Frontend Link :
https://ages-covenants-app.onrender.com

# Model

```
{ 
  name: {string, mandatory},
  email: {string, mandatory, unique},
  password: {string, mandatory}  // encrypted password
}

```

# User APIs

## POST/createUser
Create a user document from request body. Save password in encrypted format (use bcrypt). Response format On success - Return HTTP status 201. Also return the user document like below:

```

{
    "status": true,
    "data": {
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "_id": "6162876abdcb70afeeaf9cf5",
        "__v": 0
    }
}

```

On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like below :

Error Response structure

```

{
  status: false,
  msg: ""
}

```

## POST /api/login
Allow an user to login with their email and password. On a successful login attempt return a JWT token containing the userId.

Response format On success - Return HTTP status 200 and JWT token in response body. The response should be a JSON object like below:

```

{
    "status": true,
    "token": {
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8"
    }
}

```

On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like below :

Error Response structure

```
{
  status: false,
  msg: ""
}
```

# Flight API

# GET /flights (Fetch Flights prices)

Response format On success -

```

{
  "indigo": "₹2126",
  "airAsia": "₹3357",
  "vistara": "₹1199"
}

```

On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like below :

Error Response structure

```
{
  status: false,
  msg: ""
}
```