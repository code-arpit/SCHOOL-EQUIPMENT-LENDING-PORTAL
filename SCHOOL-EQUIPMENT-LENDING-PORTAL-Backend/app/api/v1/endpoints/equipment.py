from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ... import crud, models, schemas
from ...database import SessionLocal


router = APIRouter()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.Equipment)
def create_equipment(equipment: schemas.EquipmentCreate, db: Session = Depends(get_db)):
    """
    Create new equipment.
    """
    return crud.create_equipment(db=db, equipment=equipment)


@router.get("/", response_model=List[schemas.Equipment])
def read_equipments(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Retrieve equipment.
    """
    equipments = crud.get_equipments(db, skip=skip, limit=limit)
    return equipments


@router.get("/{equipment_id}", response_model=schemas.Equipment)
def read_equipment(equipment_id: int, db: Session = Depends(get_db)):
    """
    Get equipment by ID.
    """
    db_equipment = crud.get_equipment(db, equipment_id=equipment_id)
    if db_equipment is None:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return db_equipment


@router.put("/{equipment_id}", response_model=schemas.Equipment)
def update_equipment(
    equipment_id: int, equipment: schemas.EquipmentUpdate, db: Session = Depends(get_db)
):
    """
    Update an equipment.
    """
    db_equipment = crud.get_equipment(db, equipment_id=equipment_id)
    if not db_equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    equipment = crud.update_equipment(db=db, db_obj=db_equipment, obj_in=equipment)
    return equipment


@router.delete("/{equipment_id}", response_model=schemas.Equipment)
def delete_equipment(equipment_id: int, db: Session = Depends(get_db)):
    """
    Delete an equipment.
    """
    db_equipment = crud.get_equipment(db, equipment_id=equipment_id)
    if not db_equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    crud.delete_equipment(db=db, equipment_id=equipment_id)
    return db_equipment
