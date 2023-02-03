from sqlalchemy.orm import Session
from .models import Event, User
from ...models.event import Event as EventSchema 
from ...models.user import User as UserSchema
import uuid

def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, user_email: str):
    return db.query(User).filter(User.email == user_email).first()

def create_user(db: Session, user: UserSchema) :
    db_user = User(
        id = str(uuid.uuid4()),
        email = user.email,
        password = user.password,
        name = user.name,
        username = user.username
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_events(db: Session, skip: int = 0, limit = 10):
    return db.query(Event).offset(skip).limit(limit).all()


def create_event(db: Session, event: EventSchema,  skip: int = 0, limit = 100):
    
    db_event = Event(
        **event.dict(),
        owner_id = event.owner_id,
    )

    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
    