from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .db import Base

class Event(Base):
    __tablename__ = 'events'

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    eventType = Column(String)
    place = Column(String)
    address = Column(String)
    startDate = Column(DateTime)
    endDate = Column(DateTime)
    isVirtual = Column(Boolean, default=False)
    owner_id = Column(String, ForeignKey("users.id"))

    owner = relationship("User", back_populates="events")


class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True, index= True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    username = Column(String)
   

    events = relationship("Event", back_populates="owner")
    

