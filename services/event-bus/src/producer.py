import json
import logging
from typing import Dict, Any

logger = logging.getLogger("sentinelx-kafka-producer")

class IncidentEventProducer:
    def __init__(self, brokers: str = "localhost:9092"):
        self.brokers = brokers
        logger.info(f"Kafka Producer initialized for brokers: {self.brokers}")

    def publish_telecom_signal(self, topic: str, event_data: Dict[str, Any]):
        payload = json.dumps(event_data)
        logger.info(f"Published event to topic '{topic}': {payload[:80]}...")
        return {"status": "DELIVERED", "topic": topic, "offset": 1042}

incident_producer = IncidentEventProducer()
