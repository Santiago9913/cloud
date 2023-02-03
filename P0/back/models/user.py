from pydantic import BaseModel
from .event import Event

class User(BaseModel):
    id: str = ''
    email: str
    password: str
    name: str
    username: str
    events: list[Event] = []

    class Config:
        orm_mode = True