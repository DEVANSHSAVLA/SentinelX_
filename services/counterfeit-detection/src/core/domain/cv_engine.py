import base64
import re
from typing import List, Tuple, Dict, Any
from pydantic import BaseModel
import numpy as np
import cv2

class FailedMarker(BaseModel):
    marker_name: str
    details: str

def preprocess_and_verify_note(image_bytes: bytes, claimed_denom: int) -> Tuple[bool, float, int, str, List[FailedMarker], Dict[str, Any]]:
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise ValueError("OpenCV failed to decode image array.")

    height, width, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)
    
    total_pixels = height * width
    edge_density = float(np.sum(edges > 0) / total_pixels)
    
    thread_crop = img[0:height, int(width*0.45):int(width*0.55)]
    hsv_thread = cv2.cvtColor(thread_crop, cv2.COLOR_BGR2HSV)
    h_channel = hsv_thread[:, :, 0]
    hue_variance = float(np.var(h_channel))

    failed_markers = []
    thread_authentic = hue_variance > 8.0
    edges_authentic = edge_density > 0.02
    
    if not thread_authentic:
        failed_markers.append(FailedMarker(
            marker_name="security_thread_variance",
            details=f"Optical shift check failed. Hue variance detected: {hue_variance:.2f} (Expected > 8.0)"
        ))
        
    if not edges_authentic:
        failed_markers.append(FailedMarker(
            marker_name="microprint_clarity",
            details=f"Blurred print signature detected. Edge index: {edge_density:.4f} (Expected > 0.02)"
        ))

    mock_serial = "5AC982341"
    is_counterfeit = len(failed_markers) > 0
    
    if is_counterfeit:
        confidence = 0.94 if len(failed_markers) == 2 else 0.78
    else:
        confidence = 0.98

    telemetry = {
        "image_resolution": f"{width}x{height}",
        "computed_edge_density": edge_density,
        "thread_hue_variance": hue_variance,
    }

    return is_counterfeit, confidence, claimed_denom, mock_serial, failed_markers, telemetry
