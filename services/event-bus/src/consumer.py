import json
import logging
from typing import Callable, Dict, Any

logger = logging.getLogger("sentinelx-kafka-consumer")

class IncidentEventConsumer:
    def __init__(self, brokers: str = "localhost:9092", group_id: str = "sentinelx-mesh-group"):
        self.brokers = brokers
        self.group_id = group_id
        logger.info(f"Kafka Consumer initialized for group '{self.group_id}' on brokers '{self.brokers}'")

    def consume_stream(self, topic: str, handler: Callable[[Dict[str, Any]], None]):
        logger.info(f"Subscribed to topic '{topic}' with handler '{handler.__name__}'")

incident_consumer = IncidentEventConsumer()
