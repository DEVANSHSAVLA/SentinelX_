// Shared OpenTelemetry & W3C TraceContext Instrumentation Helpers
export interface TraceSpan {
  traceId: string;
  spanId: string;
  serviceName: string;
  operation: string;
  startTime: number;
}

export const startTraceSpan = (serviceName: string, operation: string, existingCorrelationId?: string): TraceSpan => {
  const traceId = existingCorrelationId || `trace-${Math.random().toString(36).substring(2, 11)}`;
  const spanId = `span-${Math.random().toString(36).substring(2, 9)}`;
  return {
    traceId,
    spanId,
    serviceName,
    operation,
    startTime: Date.now(),
  };
};

export const endTraceSpan = (span: TraceSpan, success: boolean = true) => {
  const duration = Date.now() - span.startTime;
  console.log(`[Telemetry] TraceID=${span.traceId} SpanID=${span.spanId} Service=${span.serviceName} Op=${span.operation} Duration=${duration}ms Success=${success}`);
  return duration;
};
