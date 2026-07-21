import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from src.core.services.evidence_service import evidence_service, EvidencePackageRequestDTO, EvidencePackageResponseDTO
from src.config.settings import settings

router = APIRouter()

@router.post("/evidence/package", response_model=EvidencePackageResponseDTO)
def generate_package(payload: EvidencePackageRequestDTO):
    return evidence_service.package_evidence(payload)

@router.get("/evidence/download/{case_number}")
def download_pdf(case_number: str):
    file_name = f"DEP_{case_number}.pdf"
    pdf_path = os.path.join(settings.reports_dir, file_name)
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="Evidence package not found.")
    return FileResponse(pdf_path, media_type="application/pdf", filename=file_name)
