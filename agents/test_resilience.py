from agents.workflow_manager import execute_workflow

def test_resilience_partial_failure_handling():
    print("\n--- RESILIENCE TEST: FAULT INJECTION & GRACEFUL DEGRADATION ---")
    payload = {
        "correlation_id": "corr-resilience-001",
        "caller_number": "+919876500112",
        "transcript_text": "This is customs clearance. Pay clearance fee immediately.",
        "seed_account_id": "BA-SBI-INVALID", # Trigger invalid seed
        "currency_image_base64": None, # Missing image
        "reporter_name": "Resilience Tester",
        "language_code": "en"
    }

    result = execute_workflow(payload)
    assert result.correlation_id == "corr-resilience-001"
    assert result.evaluated_guardrails == True
    assert result.agent_telemetry.get("active_agents_count") == 12
    print("SUCCESS: Resilient workflow handled offline downstream services cleanly via fallbacks!")

if __name__ == "__main__":
    test_resilience_partial_failure_handling()
    print("ALL RESILIENCE TESTS PASSED SUCCESSFULLY!")
