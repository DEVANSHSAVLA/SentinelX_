import re
from typing import List, Tuple

SCAM_TEMPLATES = [
    {
        "category": "DIGITAL_ARREST",
        "entity": "CBI / ED Enforcement Directorate",
        "keywords": ["digital arrest", "narcotics", "money laundering", "cbi", "arrest warrant", "camera"],
    },
    {
        "category": "CUSTOMS_FEE",
        "entity": "Mumbai Customs Department",
        "keywords": ["customs clearance", "narcotics found", "parcel fee", "fedex parcel", "illegal package"],
    },
    {
        "category": "BANKING_VERIFICATION",
        "entity": "Reserve Bank of India Compliance",
        "keywords": ["verify account", "card blocked", "transfer security", "kyc verification", "otp share"],
    }
]

def calculate_scam_linguistic_score(text: str) -> Tuple[float, str, str, List[str]]:
    text_lower = text.lower()
    trigger_matches = []
    matched_entity = "UNKNOWN"
    
    all_triggers = [
        "digital arrest", "cbi", "arrest warrant", "money laundering", "narcotics",
        "police custody", "suspect account", "seize assets", "fedex parcel",
        "customs clearance", "penal code", "supreme court", "video surveillance"
    ]
    
    for trigger in all_triggers:
        if re.search(r'\b' + re.escape(trigger) + r'\b', text_lower):
            trigger_matches.append(trigger)
            
    score_density = len(trigger_matches) / 5.0
    scam_score = min(max(score_density, 0.0), 1.0)
    
    best_match_count = 0
    for t in SCAM_TEMPLATES:
        overlap = sum(1 for kw in t["keywords"] if kw in text_lower)
        if overlap > best_match_count:
            best_match_count = overlap
            matched_entity = t["entity"]
            
    urgency_terms = ["immediately", "right now", "do not hang up", "confidential", "court order", "prison"]
    urgency_score = sum(1 for term in urgency_terms if term in text_lower)
    urgency_level = "CRITICAL" if urgency_score >= 2 else "HIGH" if urgency_score == 1 else "MEDIUM"
    
    return scam_score, urgency_level, matched_entity, trigger_matches
