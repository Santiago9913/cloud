from .constanst import EventType
from pydantic import BaseModel
from datetime import datetime

class Event(BaseModel):
    id: str
    name: str
    eventType: EventType
    place: str
    address: str
    startDate: datetime
    endDate: datetime
    isVirtual: bool
    owner_id: str

    class Config:
        orm_mode = True
