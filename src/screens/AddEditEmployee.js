//AddEditEmployee


{/*}
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

const AddEditEmployee = ({ route, navigation }) => {
  const { employee, onSave } = route.params || {};

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (employee) {
      setId(employee.id);
      setName(employee.name);
      setRole(employee.role);
      setDepartment(employee.department);
      setJoinDate(employee.joinDate);
      setPhone(employee.phone);
      setEmail(employee.email);
      setAddress(employee.address);
      setNotes(employee.notes);
    }
  }, [employee]);

  const handleSave = () => {
    if (!name || !role || !department || !joinDate || !phone || !email || !address) {
      Alert.alert('❗ Missing Info', 'Please fill in all required fields.');
      return;
    }

    const updatedEmployee = {
      id: id || Date.now().toString(),
      name,
      role,
      department,
      joinDate,
      phone,
      email,
      address,
      notes,
    };

    onSave?.(updatedEmployee);
    Alert.alert('✅ Success', `${employee ? 'Updated' : 'Added'} successfully`);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {employee ? '✏️ Edit Employee' : '➕ Add New Employee'}
      </Text>

      <Text style={styles.label}>👤 Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter full name" />

      <Text style={styles.label}>🆔 Employee ID</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#eee' }]}
        value={id}
        editable={false}
        placeholder="Auto-generated"
      />

      <Text style={styles.label}>💼 Role / Designation</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} placeholder="e.g. Software Engineer" />

      <Text style={styles.label}>🏢 Department</Text>
      <TextInput style={styles.input} value={department} onChangeText={setDepartment} placeholder="e.g. Development" />

      <Text style={styles.label}>📅 Join Date</Text>
      <TextInput style={styles.input} value={joinDate} onChangeText={setJoinDate} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>📞 Phone Number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="e.g. 9876543210" keyboardType="phone-pad" />

      <Text style={styles.label}>📧 Email Address</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="e.g. name@example.com" keyboardType="email-address" />

      <Text style={styles.label}>🏠 Address</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Enter address" multiline />

      <Text style={styles.label}>📝 Remarks / Notes</Text>
      <TextInput style={styles.input} value={notes} onChangeText={setNotes} placeholder="Optional" multiline />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>💾 Save Employee</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddEditEmployee;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 12,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});


*/}

// AddEditEmployee.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const AddEditEmployee = ({ route, navigation }) => {
  const { employee, onSave } = route.params || {};

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (employee) {
      setId(employee.id);
      setName(employee.name);
      setRole(employee.role);
      setDepartment(employee.department);
      setJoinDate(employee.joinDate);
      setPhone(employee.phone);
      setEmail(employee.email);
      setAddress(employee.address);
      setNotes(employee.notes);
    }
  }, [employee]);

  const handleSave = () => {
    if (!name || !role || !department || !joinDate || !phone || !email || !address) {
      Alert.alert("❗ Missing Info", "Please fill in all required fields.");
      return;
    }

    const updatedEmployee = {
      id: id || Date.now().toString(),
      name,
      role,
      department,
      joinDate,
      phone,
      email,
      address,
      notes,
    };

    onSave?.(updatedEmployee);
    Alert.alert("✅ Success", `${employee ? "Updated" : "Added"} successfully`);
    navigation.goBack();
  };

  const renderInput = (label, value, setValue, placeholder, editable = true, keyboardType = "default", multiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !editable && styles.disabledInput]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholderTextColor="#aaa"
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {employee ? "✏️ Edit Employee" : "➕ Add New Employee"}
      </Text>

      {renderInput("👤 Full Name", name, setName, "Enter full name")}
      {renderInput("🆔 Employee ID", id, setId, "Auto-generated", false)}
      {renderInput("💼 Role / Designation", role, setRole, "e.g. Software Engineer")}
      {renderInput("🏢 Department", department, setDepartment, "e.g. Development")}
      {renderInput("📅 Join Date", joinDate, setJoinDate, "YYYY-MM-DD")}
      {renderInput("📞 Phone Number", phone, setPhone, "e.g. 9876543210", true, "phone-pad")}
      {renderInput("📧 Email Address", email, setEmail, "e.g. name@example.com", true, "email-address")}
      {renderInput("🏠 Address", address, setAddress, "Enter address", true, "default", true)}
      {renderInput("📝 Remarks / Notes", notes, setNotes, "Optional", true, "default", true)}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>💾 Save Employee</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddEditEmployee;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#f4f6f8",
    flexGrow: 1,
  },
  

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    fontWeight: "600",
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 15,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  disabledInput: {
    backgroundColor: "#eee",
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
});


