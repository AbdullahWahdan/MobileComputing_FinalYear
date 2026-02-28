import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';

// System fonts — no external font package needed (works in Expo Snack)
const FONTS = {
  regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  semiBold: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
};

// ─── Color Palette ───────────────────────────────────────────────────────────
const COLORS = {
  background: '#0F172A', // Deep Navy
  surface: '#1E293B', // Slate (card background)
  primary: '#7C3AED', // Violet (accent)
  primaryLight: '#A78BFA', // Lavender
  success: '#10B981', // Emerald (done state)
  danger: '#F43F5E', // Rose (delete)
  textPrimary: '#F8FAFC', // Near-white
  textSecondary: '#94A3B8', // Muted gray
  border: '#334155', // Subtle border
};

// ─── GoalItem Component ──────────────────────────────────────────────────────
const GoalItem = ({ item, onDelete, onToggle }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.goalItem, { transform: [{ scale: scaleAnim }] }]}>
      {/* Toggle done checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, item.done && styles.checkboxDone]}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}
      >
        {item.done && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Goal text */}
      <Text style={[styles.goalText, item.done && styles.goalTextDone]} numberOfLines={2}>
        {item.text}
      </Text>

      {/* Delete button */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  // State 1 — controlled TextInput value
  const [inputText, setInputText] = useState('');

  // State 2 — list of goal objects
  const [goalsList, setGoalsList] = useState([]);

  // Handler — add goal on button press
  const addGoalHandler = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return; // prevent empty entries
    setGoalsList(prev => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, done: false },
    ]);
    setInputText('');
  }, [inputText]);

  // Handler — delete a goal from the list
  const deleteGoalHandler = useCallback((id) => {
    setGoalsList(prev => prev.filter(goal => goal.id !== id));
  }, []);

  // Handler — toggle done/undone for a goal
  const toggleGoalHandler = useCallback((id) => {
    setGoalsList(prev =>
      prev.map(goal => goal.id === id ? { ...goal, done: !goal.done } : goal)
    );
  }, []);

  const doneCount = goalsList.filter(g => g.done).length;

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Goals 🎯</Text>
        <Text style={styles.headerSubtitle}>
          {goalsList.length === 0
            ? 'No goals yet — add one below!'
            : `${doneCount} of ${goalsList.length} completed`}
        </Text>
        {goalsList.length > 0 && (
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(doneCount / goalsList.length) * 100}%` },
              ]}
            />
          </View>
        )}
      </View>

      {/* ── Goals FlatList ── */}
      <FlatList
        data={goalsList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>Start adding your goals!</Text>
            <Text style={styles.emptySubText}>Type something below and press Add</Text>
          </View>
        }
        renderItem={({ item }) => (
          <GoalItem
            item={item}
            onDelete={deleteGoalHandler}
            onToggle={toggleGoalHandler}
          />
        )}
      />

      {/* ── Input Section ── */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a new goal..."
          placeholderTextColor={COLORS.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addGoalHandler}
          returnKeyType="done"
          maxLength={100}
        />
        <TouchableOpacity
          style={[styles.addButton, !inputText.trim() && styles.addButtonDisabled]}
          onPress={addGoalHandler}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Header
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontWeight: '700',
    fontSize: 32,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },

  // ── List
  listContent: {
    padding: 16,
    paddingBottom: 8,
    flexGrow: 1,
  },

  // ── Goal Item
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  goalText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  goalTextDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(244,63,94,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteIcon: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // ── Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  emptySubText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  // ── Input area
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
    gap: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  addButtonText: {
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
    fontSize: 15,
    color: '#fff',
  },
});
