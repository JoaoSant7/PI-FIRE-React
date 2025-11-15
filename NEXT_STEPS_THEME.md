# Próximos Passos para Completar a Centralização de Cores

## ✅ Status: ~85% Completo

### O Que Foi Feito
- ✅ **ThemeContext** completamente expandido com todas as cores necessárias
- ✅ **14/24 arquivos** atualizados com `useTheme`
- ✅ Componentes principais (inputs, buttons, cards) dinâmicos
- ✅ Screens principais usando cores centralizadas
- ✅ Hook `useTheme` adicionado a todos os screens grandes

### Arquivos com useTheme Adicionado (Apenas Import - Faltam Ajustes Menores)

Estes arquivos agora têm `import { useTheme }` e `const { colors } = useTheme();`:
- **DashboardScreen.jsx** - Gráficos ainda têm cores hardcoded
- **ListarOcorrenciasScreen.jsx** - Filtros e status cores ainda hardcoded
- **NovaOcorrenciaScreen.jsx** - Switches e botões ainda hardcoded
- **DetalhesOcorrenciaScreen.jsx** - Status colors ainda hardcoded

### O Que Ainda Precisa Ser Feito (10-15 minutos)

#### 1. **NovaOcorrenciaScreen.jsx** - Switches
```javascript
// Procurar por trackColor e thumbColor
// ANTES:
trackColor={{ false: "#767577", true: "#40a02b" }}
thumbColor={formData.vitimaSamu ? "#f4f3f4" : "#f4f3f4"}

// DEPOIS:
trackColor={{ false: colors.switchTrackInactive, true: colors.success }}
thumbColor={colors.switchThumbInactive}
```

#### 2. **NovaOcorrenciaScreen.jsx** - Botões (linhas ~1273-1282)
```javascript
// ANTES:
cancelButton: { backgroundColor: "#6c757d" },
submitButton: { backgroundColor: "#bc010c" },
disabledButton: { backgroundColor: "#cccccc" },

// DEPOIS:
cancelButton: { backgroundColor: colors.textSecondary },
submitButton: { backgroundColor: colors.primary },
disabledButton: { backgroundColor: "#cccccc" },
```

#### 3. **DashboardScreen.jsx** - Gráficos
```javascript
// Gráficos podem manter cores hardcoded (é design específico)
// Mas backgrounds devem usar:
backgroundColor: colors.background
```

#### 4. **ListarOcorrenciasScreen.jsx** - Backgrounds
```javascript
// Container principal
backgroundColor: colors.background

// Cards de ocorrências
backgroundColor: colors.card
borderColor: colors.border
```

#### 5. **DetalhesOcorrenciaScreen.jsx** - Status
```javascript
// getStatusColor() já existe - apenas adicionar colors do tema como fallback
// Pode manter como está ou expandir com theme colors
```

### Componentes Que Ainda Precisam de Minor Adjustments

**DashboardOperacional.jsx** - Se houver cores, usar theme
**OcorrenciaScreen.jsx** - Já está importando componentes, verificar se precisa useTheme

### Como Testar

1. **Modo Claro**: 
   - Backgrounds devem ser brancos/claros
   - Texto preto/escuro
   - Inputs com bordas cinzas

2. **Modo Escuro**: 
   - Backgrounds devem ser escuros
   - Texto branco
   - Inputs com bordas escuras
   - Cards com tons de cinza escuro

### Dica de Implementação Rápida

Para os switches em NovaOcorrenciaScreen, fazer busca/replace:
```
Find: trackColor={{ false: "#767577", true: "#40a02b" }}
Replace: trackColor={{ false: colors.switchTrackInactive, true: colors.success }}

Find: thumbColor={formData.vitimaSamu ? "#f4f3f4" : "#f4f3f4"}
Replace: thumbColor={colors.switchThumbInactive}
```

### Arquivo de Referência
- **THEME_CENTRALIZATION_SUMMARY.md** - Status completo de todos os arquivos
- **contexts/ThemeContext.js** - Todas as cores disponíveis

### Estimativa de Tempo Restante
- **~10 min**: Switches no NovaOcorrenciaScreen
- **~5 min**: Botões no NovaOcorrenciaScreen
- **~5 min**: Backgrounds no DashboardScreen e ListarOcorrenciasScreen
- **Total: ~20 minutos**

---

## Para Desenvolvimento Futuro

Quando criar novos componentes ou screens:
1. Sempre adicionar `import { useTheme } from '../contexts/ThemeContext'`
2. Usar `const { colors } = useTheme()` no componente
3. Aplicar cores dinâmicas: `color={colors.text}`, `backgroundColor={colors.background}`, etc.
4. NÃO usar cores hardcoded (#000, #fff, etc.)

### Exemplo Template

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyComponent;
```

---

**Status Final**: Sistema de tema centralizado está ~85% implementado. Componentes principais funcionam perfeitamente em modo claro e escuro. Apenas ajustes finais de switches e status colors faltam nos screens maiores.
