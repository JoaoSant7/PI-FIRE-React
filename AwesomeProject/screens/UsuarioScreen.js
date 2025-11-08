// screens/UsuarioScreen.js
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function UsuarioScreen({ navigation, route }) {
  // Dados do usuário (em uma aplicação real, viriam do contexto ou API)
  const userData = {
    nome: 'Carlos Silva',
    idade: 34,
    anoNascimento: 1990,
    tipoSanguineo: 'O+',
    batalhao: '5º Batalhão de Bombeiros Militar',
    email: route.params?.email || 'usuario@bombeiros.gov.br',
    matricula: 'BM-2023-04567',
    funcao: 'Sargento',
    telefone: '(11) 99999-9999'
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      {/* Header com seta de voltar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil do Usuário</Text>
        <View style={styles.placeholder} /> {/* Para centralizar o título */}
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Seção do Placeholder do Perfil */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <View style={styles.photoPlaceholder}>
              <Icon name="person" size={50} color="#bc010c" />
            </View>
            <TouchableOpacity style={styles.editPhotoButton}>
              <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData.nome}</Text>
          <Text style={styles.userRank}>{userData.funcao}</Text>
        </View>

        {/* Informações Pessoais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <InfoRow icon="person" label="Nome Completo" value={userData.nome} />
          <InfoRow icon="cake" label="Idade" value={`${userData.idade} anos`} />
          <InfoRow icon="calendar-today" label="Ano de Nascimento" value={userData.anoNascimento.toString()} />
          <InfoRow icon="favorite" label="Tipo Sanguíneo" value={userData.tipoSanguineo} />
          <InfoRow icon="badge" label="Matrícula" value={userData.matricula} />
        </View>

        {/* Informações Profissionais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Profissionais</Text>
          
          <InfoRow icon="work" label="Batalhão" value={userData.batalhao} />
          <InfoRow icon="engineering" label="Função" value={userData.funcao} />
        </View>

        {/* Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          
          <InfoRow icon="email" label="E-mail" value={userData.email} />
          <InfoRow icon="phone" label="Telefone" value={userData.telefone} />
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="edit" size={20} color="#bc010c" />
            <Text style={styles.actionButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="security" size={20} color="#bc010c" />
            <Text style={styles.actionButtonText}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Componente reutilizável para as linhas de informação
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <Icon name={icon} size={20} color="#bc010c" style={styles.infoIcon} />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#bc010c',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24, // Para equilibrar com o botão de voltar
  },
  scrollContent: {
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#bc010c',
  },
  editPhotoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#bc010c',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userRank: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#bc010c',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  actionsSection: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  actionButtonText: {
    marginLeft: 8,
    color: '#bc010c',
    fontWeight: '600',
  },
});