from pydantic import BaseModel, EmailStr
from typing import Optional
from .models import EquipmentCondition, UserRole


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.STUDENT


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDB(UserBase):
    id: int
    is_active: bool
    role: UserRole

    class Config:
        orm_mode = True


class User(UserBase):
    id: int
    is_active: bool
    role: UserRole

    class Config:
        orm_mode = True


# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[EmailStr] = None


# Equipment schemas
class EquipmentBase(BaseModel):
    name: str


from pydantic import BaseModel
from typing import Optional
from .models import EquipmentCondition


class EquipmentBase(BaseModel):
    name: str
    category: str
    condition: EquipmentCondition
    quantity: int
    availability: bool = True


class EquipmentCreate(EquipmentBase):
    pass


class EquipmentUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    condition: Optional[EquipmentCondition] = None
    quantity: Optional[int] = None
    availability: Optional[bool] = None


class Equipment(EquipmentBase):
    id: int

    class Config:
        orm_mode = True
