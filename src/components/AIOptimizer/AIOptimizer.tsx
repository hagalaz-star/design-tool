import React, { useState } from "react";
import { ComponentType, ComponentOptionsTypeMap } from "../../types/index";
import axios from "axios";

interface AIOptimizerProps {
  currentCode: string; // 현재 코드
  componentType: ComponentType; // 디자인 유형
  options: ComponentOptionsTypeMap[ComponentType]; // 디자인 유형 상세 정의
  codeFormat: "react" | "html"; // 디자인 코드로 나타내는 2종류
  onApplyOptimized: (optimizedCode: string) => void;
}

function AIOptimizer({
  currentCode,
  componentType,
  options,
  codeFormat,
  onApplyOptimized,
}: AIOptimizerProps) {
  const [prompt, setPrompt] = useState(""); // 최적화 코드
  const [generatedText, setGeneratedText] = useState(""); // 원본코드
  const [loading, setLoading] = useState(false); // 로딩
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setGeneratedText("");

    const optimizationPrompt = `다음 ${codeFormat} 코드를 \n\n\`\`\`${currentCode}\`\`\`\n\n 을 ${componentType}디자인 유형에 맞추어서 ${JSON.stringify(
      options
    )} 에 맞춰 최적화로 진행`;
    setPrompt(optimizationPrompt);

    try {
      const response = await axios.post("/api/gemini", {
        prompt: optimizationPrompt,
      });

      setGeneratedText(response.data.text);
      onApplyOptimized(response.data.text);
    } catch (error: any) {
      setError(error.response?.data?.error || "코드 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        Ai 최적화 버튼
      </button>

      {loading && <p>AI가 코드를 최적화 하는중...</p>}
      {error && <p className="error">{error}</p>}

      {generatedText && (
        <div>
          <h4>AI가 최적화한 코드</h4>
          <pre>
            <code>{generatedText}</code>
          </pre>
          <button onClick={() => onApplyOptimized(generatedText)}>
            이 코드 적용하기
          </button>
        </div>
      )}
    </div>
  );
}

export default AIOptimizer;
