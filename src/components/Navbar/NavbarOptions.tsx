import React from "react";
import styles from "./Navbar.module.scss";
import { NavbarOptions } from "@/types";

interface NavbarOptionsProps {
  options: NavbarOptions;
  onOptionChange: (name: string, value: any) => void;
}

function NavbarOptionsPanel({ options, onOptionChange }: NavbarOptionsProps) {
  const renderOptions = () => {
    return (
      <div className={styles.OptionsPanel}>
        <div className={styles.optionItem}>
          <label>기본 스타일</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>배경색</label>
              <input
                type="color"
                value={options.backgroundColor}
                onChange={(e) =>
                  onOptionChange("backgroundColor", e.target.value)
                }
              />
            </div>

            <div className={styles.optionSubItem}>
              <label>높이</label>
              <input
                type="number"
                value={parseInt(options.height) || 0}
                onChange={(e) =>
                  onOptionChange("height", `${e.target.value}px`)
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>로고 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>로고 URL</label>
              <input
                type="text"
                value={options.logo}
                onChange={(e) => onOptionChange("logo", e.target.value)}
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>로고 색상</label>
              <input
                type="color"
                value={options.logoColor}
                onChange={(e) => onOptionChange("logoColor", e.target.value)}
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>로고 크기</label>
              <select
                value={options.logoSize}
                onChange={(e) => onOptionChange("logoSize", e.target.value)}
              >
                <option value="small">작게</option>
                <option value="medium">중간</option>
                <option value="large">크게</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>메뉴 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>메뉴 위치</label>
              <select
                value={options.menuPosition}
                onChange={(e) => onOptionChange("menuPosition", e.target.value)}
              >
                <option value="left">좌측</option>
                <option value="center">중앙</option>
                <option value="right">우측</option>
              </select>
            </div>
            <div className={styles.optionSubItem}>
              <label>메뉴 간격</label>
              <input
                type="number"
                value={parseInt(options.menuSpacing) || 0}
                onChange={(e) =>
                  onOptionChange("menuSpacing", `${e.target.value}px`)
                }
              />
            </div>

            <div className={styles.optionSubItem}>
              <label>메뉴 글자 색상</label>
              <input
                type="color"
                value={options.textColor}
                onChange={(e) => onOptionChange("textColor", e.target.value)}
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>글자 크기</label>
              <input
                type="number"
                value={parseInt(options.menuFontSize) || 0}
                onChange={(e) =>
                  onOptionChange("menuFontSize", `${e.target.value}px`)
                }
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>글자 굵기</label>
              <select
                value={options.menuFontWeight}
                onChange={(e) =>
                  onOptionChange("menuFontWeight", e.target.value)
                }
              >
                <option value="normal">보통</option>
                <option value="medium">중간</option>
                <option value="bold">굵게</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>반응형 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>반응형 기준</label>
              <select
                value={options.breakpoint}
                onChange={(e) => onOptionChange("breakpoint", e.target.value)}
              >
                <option value="sm">작은 화면</option>
                <option value="md">중간 화면</option>
                <option value="lg">큰 화면</option>
              </select>
            </div>
            <div className={styles.optionSubItem}>
              <label>모바일 메뉴 아이콘</label>
              <select
                value={options.mobileMenuIcon}
                onChange={(e) =>
                  onOptionChange("mobileMenuIcon", e.target.value)
                }
              >
                <option value="hamburger">햄버거</option>
                <option value="dots">점</option>
                <option value="none">없음</option>
              </select>
            </div>
            <div className={styles.optionSubItem}>
              <label>모바일 메뉴 색상</label>
              <input
                type="color"
                value={options.mobileMenuColor}
                onChange={(e) =>
                  onOptionChange("mobileMenuColor", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>효과 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>고정 여부</label>
              <input
                type="checkbox"
                checked={options.fixed}
                onChange={(e) => onOptionChange("fixed", e.target.checked)}
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>그림자</label>
              <select
                value={options.shadow}
                onChange={(e) => onOptionChange("shadow", e.target.value)}
              >
                <option value="none">없음</option>
                <option value="small">작게</option>
                <option value="medium">중간</option>
                <option value="large">크게</option>
              </select>
            </div>
            <div className={styles.optionSubItem}>
              <label>투명도</label>
              <input
                type="checkbox"
                checked={options.transparent}
                onChange={(e) =>
                  onOptionChange("transparent", e.target.checked)
                }
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>블러 효과</label>
              <input
                type="checkbox"
                checked={options.blur}
                onChange={(e) => onOptionChange("blur", e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>테두리 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>하단 테두리</label>
              <input
                type="checkbox"
                checked={options.borderBottom}
                onChange={(e) =>
                  onOptionChange("borderBottom", e.target.checked)
                }
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>테두리 색상</label>
              <input
                type="color"
                value={options.borderColor}
                onChange={(e) => onOptionChange("borderColor", e.target.value)}
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>테두리 두께</label>
              <input
                type="number"
                value={parseInt(options.borderWidth) || 0}
                onChange={(e) =>
                  onOptionChange("borderWidth", `${e.target.value}px`)
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.OptionsPanel}>
      <h3>네비게이션 바 옵션 설정</h3>
      {renderOptions()}
    </div>
  );
}

export default NavbarOptionsPanel;
