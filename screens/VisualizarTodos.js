import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { excluirCorrida, listarCorridas } from '../database/BaseDados';

const VisualizarTodos = ({navigation}) => {
  const [corridas, setCorridas] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log("Alow")
    listarCorridas((corridas) => {
      setCorridas(corridas);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualizar Todos</Text>
      {
        corridas && corridas.length > 0
        ?
          <Text style={styles.title}>Total de corridas: {corridas.length}</Text>
        : 
          <></>
      }
      
      <FlatList
        data={corridas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nº doc: {item.ndoc}</Text>
            <Text>Passageiro: {item.passageiro}</Text>
            <Text>Origem: {item.origem}</Text>
            <Text>Destino: {item.destino}</Text>
            <Text>Valor: {item.valor}</Text>
            <Text>Data: {item.data ? `${(new Date(item.data)).toLocaleDateString('pt-br')} ${(new Date(item.data)).toLocaleTimeString('pt-br')}` : ""}</Text>
            <Text>meio de pagamento: {item.meioPG}</Text>
            <Text>Indicação: {item.indicacao}</Text>
            <Text>Fonte da indicação: {item.fonteIndicacao}</Text>
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={() => excluirCorrida(item.id, (response) => {
                if(response && response.bool) {
                  Alert.alert("Removido com sucesso")
                  setCorridas(response.data)
                } else {
                  Alert.alert("Erro ao remover")
                }
                setChanged(true);
              })} style={{padding: 10,marginRight: 20, borderWidth: 1, borderColor: "black", borderRadius: 3, width: "30%", alignItems: "center", marginTop: 10}}>
                <Text>
                  Remover
                </Text>
                
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                corrida: item
              })} style={{padding: 10, borderWidth: 1, borderColor: "black", borderRadius: 3, width: "30%", alignItems: "center", marginTop: 10}}>
                <Text>
                  Atualizar
                </Text>
              </TouchableOpacity>
            </View>

            </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default VisualizarTodos;