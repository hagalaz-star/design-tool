import React, { useState } from "react";
import { ComponentType, ComponentOptionsTypeMap } from "../../types/index";
import axios from "axios";
import styles from "./AIOptimizer.module.scss";

interface AIOptimizerProps {
  currentCode: string; // 현재 코드
  componentType: ComponentType; // 디자인 유형
  options: ComponentOptionsTypeMap[ComponentType]; // 디자인 유형 상세 정의
  codeFormat: "react-tailwind" | "react-scss"; // 디자인 코드로 나타내는 2종류
  onApplyOptimized: (optimizedCode: string) => void;
}

function AIOptimizer({
  currentCode,
  componentType,
  options,
  codeFormat,
  onApplyOptimized,
}: AIOptimizerProps) {
  const [originalCode, setOriginalCode] = useState(""); // 원본코드
  const [optimizedCode, setOptimizedCode] = useState(""); // 최적화 코드
  const [loading, setLoading] = useState(false); // 로딩
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setOptimizedCode("");

    const optimizationPrompt = `코드 최적화 요청:
    - 형식: ${codeFormat === "react-tailwind" ? "React tailwind" : "react-scss"}
    - 컴포넌트: ${componentType}
    - 옵션: ${JSON.stringify(options)}
    
    ${
      codeFormat === "react-tailwind"
        ? "목표: Tailwind CSS 클래스를 활용한 재사용 가능한 컴포넌트, 모든 스타일은 Tailwind 클래스로만 구현"
        : "목표: CSS 모듈과 SCSS를 활용한 재사용 가능한 컴포넌트, 스타일은 별도의 SCSS 모듈에 정의"
    }
    
   Please optimize the following code snippet:\n\n\`\`\`javascript\n${originalCode}\n\`\`\`;
    
    중요: 지시사항을 정확히 따라 ${
      codeFormat === "react-tailwind" ? "Tailwind CSS" : "SCSS"
    } 형식으로만 결과를 제공하세요. 코드만 반환하고 설명은 포함하지 마세요.`;

    try {
      const response = await axios.post("/api/gemini", {
        prompt: optimizationPrompt,
      });

      const resultText = response.data.text;
      setOptimizedCode(resultText);
      onApplyOptimized(resultText);
    } catch (error: any) {
      setError(error.response?.data?.error || "코드 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.optimizerContainer}>
      <h3 className={styles.optimizerTitle}>AI 코드 최적화</h3>
      <br></br>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={styles.optimizeButton}
      >
        AI 최적화 버튼
      </button>

      {loading && (
        <p className={styles.loadingMessage}>AI가 코드를 최적화 하는중...</p>
      )}
      {error && <p className={styles.error}>{error}</p>}

      {optimizedCode && (
        <div className={styles.resultContainer}>
          <h4 className={styles.resultTitle}>AI가 최적화한 코드</h4>
          <pre className={styles.codeDisplay}>
            <code>{optimizedCode}</code>
          </pre>
          <button
            onClick={() => onApplyOptimized(optimizedCode)}
            className={styles.applyButton}
          >
            이 코드 적용하기
          </button>
        </div>
      )}
    </div>
  );
}

export default AIOptimizer;
