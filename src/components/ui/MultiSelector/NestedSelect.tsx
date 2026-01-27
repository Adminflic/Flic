import React, { useState, useRef, useEffect } from 'react';
import './NestedSelect.css';

const NestedSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('--Please choose an option--');
  
  const selectRef = useRef(null);
  const submenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const optionRefs = useRef({});

  // Datos que simulan tu estructura HTML
  const options = [
    { 
      value: '', 
      label: '--Please choose an option--',
      type: 'option'
    },
    { 
      value: 'dog', 
      label: 'Dog',
      type: 'option'
    },
    { 
      value: 'cat', 
      label: 'Cat',
      type: 'option'
    },
    { 
      value: 'hamster', 
      label: 'Hamster',
      type: 'option'
    },
    { 
      value: 'parrot', 
      label: 'Parrot',
      type: 'subselect', // Esta opción abre un sub-selector
      subOptions: [
        { value: '', label: '--Please choose an option--' },
        { value: 'african-grey', label: 'African Grey' },
        { value: 'macaw', label: 'Macaw' },
        { value: 'cockatoo', label: 'Cockatoo' },
        { value: 'parakeet', label: 'Parakeet' },
        { value: 'lovebird', label: 'Lovebird' }
      ]
    },
    { 
      value: 'spider', 
      label: 'Spider',
      type: 'option'
    },
    { 
      value: 'goldfish', 
      label: 'Goldfish',
      type: 'option'
    },
    { 
      value: 'human', 
      label: 'Human (has sub-selector)',
      type: 'subselect', // Esta opción abre un sub-selector
      subOptions: [
        { value: '', label: '--Please choose an option--' },
        { value: 'man', label: 'Man' },
        { value: 'woman', label: 'Woman' },
        { value: 'child', label: 'Child' },
        { value: 'adult', label: 'Adult' },
        { value: 'senior', label: 'Senior' }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setHoveredOption(null);
      }
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setHoveredOption(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (option, event) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (option.type === 'subselect') {
      setHoveredOption(option);
      
      const rect = event.currentTarget.getBoundingClientRect();
      setSubmenuPosition({
        top: rect.top,
        left: rect.right,
        height: rect.height
      });
    }
  };

  const handleOptionMouseLeave = (option) => {
    // Solo configuramos timeout para opciones con subselector
    if (option.type === 'subselect') {
      hoverTimeoutRef.current = setTimeout(() => {
        // Verificar si el mouse no está ni en la opción ni en el submenu
        const isMouseOnOption = optionRefs.current[option.value]?.contains(document.activeElement) ||
                                optionRefs.current[option.value]?.matches(':hover');
        
        const isMouseOnSubmenu = submenuRef.current?.contains(document.activeElement) ||
                                submenuRef.current?.matches(':hover');
        
        if (!isMouseOnOption && !isMouseOnSubmenu) {
          setHoveredOption(null);
        }
      }, 100); // Pequeño delay para permitir mover el mouse al submenu
    }
  };

  const handleSubmenuMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleSubmenuMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredOption(null);
    }, 150);
  };

  // Función para verificar si el mouse está sobre la opción o el submenu
  const checkMousePosition = () => {
    if (!hoveredOption || !optionRefs.current[hoveredOption.value]) return false;
    
    const optionElement = optionRefs.current[hoveredOption.value];
    const isMouseOnOption = optionElement.contains(document.activeElement) ||
                           optionElement.matches(':hover');
    
    const isMouseOnSubmenu = submenuRef.current?.contains(document.activeElement) ||
                            submenuRef.current?.matches(':hover');
    
    return isMouseOnOption || isMouseOnSubmenu;
  };

  // Efecto para verificar periódicamente la posición del mouse
  useEffect(() => {
    if (!hoveredOption) return;

    const checkInterval = setInterval(() => {
      if (!checkMousePosition()) {
        setHoveredOption(null);
      }
    }, 200); // Verificar cada 200ms

    return () => clearInterval(checkInterval);
  }, [hoveredOption]);

  const handleSelect = (option) => {
    if (option.type === 'option') {
      setSelectedValue(option.value);
      setSelectedLabel(option.label);
      setIsOpen(false);
      console.log('Selected:', option.value, option.label);
    }
    // Si es subselect, no selecciona inmediatamente, espera selección del submenú
  };

  const handleSubSelect = (mainOption, subOption) => {
    setSelectedValue(`${mainOption.value}-${subOption.value}`);
    setSelectedLabel(`${mainOption.label} - ${subOption.label}`);
    setIsOpen(false);
    setHoveredOption(null);
    console.log('Selected:', `${mainOption.value}-${subOption.value}`, `${mainOption.label} - ${subOption.label}`);
  };

  return (
    <div className="nested-select-container" ref={selectRef}>
      {/* Selector principal que se parece a un <select> */}
      <div 
        className="custom-select"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected-label">{selectedLabel}</span>
        <span className="select-arrow">▼</span>
      </div>

      {/* Dropdown de opciones (simula el <select> abierto) */}
      {isOpen && (
        <div className="select-dropdown">
          {options.map((option, index) => (
            <div
              key={index}
              ref={el => {
                if (option.value) {
                  optionRefs.current[option.value] = el;
                }
              }}
              className={`select-option ${option.type === 'subselect' ? 'has-subselect' : ''} ${hoveredOption?.value === option.value ? 'hovered' : ''}`}
              onMouseEnter={(e) => handleMouseEnter(option, e)}
              onMouseLeave={() => handleOptionMouseLeave(option)}
              onClick={() => handleSelect(option)}
            >
              <span>{option.label}</span>
              {option.type === 'subselect' && (
                <span className="subselect-indicator">▶</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sub-selector que aparece a la derecha */}
      {hoveredOption && hoveredOption.type === 'subselect' && (
        <div
          ref={submenuRef}
          className="sub-selector"
          style={{
            top: `${submenuPosition.top}px`,
            left: `${submenuPosition.left}px`,
          }}
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
        >
          <div className="sub-selector-header">
            <span>{hoveredOption.label}</span>
          </div>
          <div className="sub-options-container">
            {hoveredOption.subOptions.map((subOption, idx) => (
              <div
                key={idx}
                className="sub-option"
                onClick={() => handleSubSelect(hoveredOption, subOption)}
              >
                {subOption.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NestedSelect;