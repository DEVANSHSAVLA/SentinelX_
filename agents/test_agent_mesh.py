from agents.agent_mesh import run_12_agent_mesh_pipeline

def test_12_agent_mesh_execution():
    payload = {
        "correlation_id": "corr-test-001",
        "caller_number": "+919876500112",
        "transcript_text": "This is CBI officer. Pay 50000 rupees to avoid digital arrest.",
        "seed_account_id": "BA-SBI-1002",
        "reporter_name": "Test User",
        "language_code": "en"
    }
    result = run_12_agent_mesh_pipeline(payload)
    assert result.correlation_id == "corr-test-001"
    assert result.hazard_level == "CRITICAL"
    assert result.composite_risk_score > 0.80
    assert result.is_scam == True
    assert result.is_mule_ring == True
    assert result.evaluated_guardrails == True
    assert "LOCK_BANK_APPS" in result.directives
    assert result.agent_telemetry.get("active_agents_count") == 12

if __name__ == "__main__":
    test_12_agent_mesh_execution()
    print("ALL 12-AGENT MESH TESTS PASSED SUCCESSFULLY!")
