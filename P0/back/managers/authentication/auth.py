from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt

SECRET_KEY = "ae6c01371316ac0f153489e51a05c6566c974b0c000c25630675f9af0fd0b128"
ALGORITHM = "HS256"
EXPIRATION_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verifyPassword(plainPass: str, hashedPass: str):
    return pwd_context.verify(plainPass, hashedPass)

def getPasswordHash(password: str):
      return pwd_context.hash(password)

def createJWT(id: str, email: str, name: str, expires_delta: timedelta | None = None):
     toEncode = {"id": id, "email": email, "name": name,}
     if expires_delta:
          expire = datetime.utcnow() + expires_delta
     else:
          expire = datetime.utcnow() + timedelta(minutes=30)
    
     toEncode.update({"exp": expire})
     encoded_jwt = jwt.encode(toEncode, SECRET_KEY, algorithm=ALGORITHM)
     return encoded_jwt

     