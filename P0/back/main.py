from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException, Request, Response, Body
import json

import back.managers.db.crud as Crud
import back.managers.db.models as models
from back.managers.db.db import SessionLocal, engine
from .models.event import Event
from .models.user import User
from .managers.authentication.auth import oauth2_scheme, createJWT

models.Base.metadata.create_all(bind=engine)



app = FastAPI()

@app.middleware('http')
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response

# @app.middleware('http')
async def decode_token(request: Request, call_next):
    response = Response('Missing JWT', status_code=401)
    try:
        body = await request.json()
        jwt = body["jwt"]
        if(jwt):
            request.state.jwt = jwt
            response = await call_next(request)
    finally:
        return response


def get_db(request: Request):
    return request.state.db


@app.get('/')
def read_root():
    return {'Hello': 'World'}

@app.post('/user/')
async def create_user(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    email = body['email']
    db_user = Crud.get_user_by_email(db, email)
    

    if db_user:
        return Response(json.dumps({"status": 400, "msg": "User already registered"}), status_code=400)
    else:
        nUser = User(
            email= body['email'],
            name= body['name'],
            password= body['password'],
            username=body['password'],
        )
        user_created =  Crud.create_user(db=db, user=nUser)
        jwt = createJWT(email= email, id=user_created.id, name=user_created.name)

        responseUser = {
            "id ": user_created.id,
            "email": user_created.email,
            "name": user_created.name, 
            "username": user_created,
            "events": user_created.events,
        }

        return Response(
            json.dumps({"status": 200, "user": responseUser, "jwt": jwt})
        )

@app.get('/user/{user_id}', response_model=User)
def get_users(user_id, db: Session = Depends(get_db)):
    return {"Hola": user_id}
