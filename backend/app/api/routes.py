from fastapi import APIRouter

router = APIRouter(prefix="/api")

@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "AI Automatic Block Planning",
        "environment": "development"
    }

@router.get("/maintenance-tasks")
def get_maintenance_tasks():
    return {"success": True, "data": [], "message": "Tasks retrieved successfully"}

@router.get("/maintenance-tasks/{id}")
def get_maintenance_task(id: int):
    return {"success": True, "data": {"id": id, "name": f"Mock Task {id}"}, "message": "Task retrieved successfully"}

@router.get("/block-windows")
def get_block_windows():
    return {"success": True, "data": [], "message": "Block windows retrieved successfully"}

@router.get("/block-plans")
def get_block_plans():
    return {"success": True, "data": [], "message": "Block plans retrieved successfully"}

@router.post("/optimization/generate")
def generate_optimization():
    return {
        "success": True, 
        "data": {
            "generated_blocks": [
                {"id": 1, "status": "AI RECOMMENDED", "description": "Block A"}
            ],
            "conflicts": [
                {"id": 1, "status": "CONTROLLER REVIEW", "description": "Conflict X"}
            ]
        }, 
        "message": "Optimization generated successfully"
    }

@router.get("/corridors")
def get_corridors():
    return {"success": True, "data": [], "message": "Corridors retrieved successfully"}

@router.get("/assets")
def get_assets():
    return {"success": True, "data": [], "message": "Assets retrieved successfully"}

@router.get("/trains")
def get_trains():
    return {"success": True, "data": [], "message": "Trains retrieved successfully"}

@router.get("/conflicts")
def get_conflicts():
    return {"success": True, "data": [], "message": "Conflicts retrieved successfully"}
