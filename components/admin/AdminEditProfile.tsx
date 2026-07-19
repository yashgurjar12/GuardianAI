import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { CheckCircle2, Camera, Trash2 } from 'lucide-react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';

interface AdminEditProfileProps {
  editAdminName: string;
  setEditAdminName: (name: string) => void;
  editAdminEmail: string;
  setEditAdminEmail: (email: string) => void;
  editAdminAvatar?: string;
  setEditAdminAvatar: (uri: string | undefined) => void;
  handleSaveProfile: () => void;
}

export default function AdminEditProfile({
  editAdminName,
  setEditAdminName,
  editAdminEmail,
  setEditAdminEmail,
  editAdminAvatar,
  setEditAdminAvatar,
  handleSaveProfile,
}: AdminEditProfileProps) {

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      // Use web DOM input for robust file selection on browser
      try {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
              setEditAdminAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      } catch (err) {
        console.error('Error opening file picker on web:', err);
      }
    } else {
      // Use expo image picker for mobile app
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access photo library is required to select a photo!');
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setEditAdminAvatar(result.assets[0].uri);
        }
      } catch (err) {
        console.error('Error picking image on native:', err);
      }
    }
  };

  const removeImage = () => {
    setEditAdminAvatar(undefined);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.collapsibleSecTitle}>Update Admin Profile</Text>

      {/* Profile Photo Upload Section */}
      <View style={styles.avatarUploadContainer}>
        <View style={styles.avatarFrame}>
          {editAdminAvatar ? (
            <Image source={{ uri: editAdminAvatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>
                {editAdminName.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.cameraOverlayBtn} onPress={pickImage} activeOpacity={0.8}>
            <Camera size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.uploadButtonsRow}>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Camera size={14} color={Colors.primary} />
            <Text style={styles.uploadBtnText}>Upload Photo</Text>
          </TouchableOpacity>
          {editAdminAvatar && (
            <TouchableOpacity style={styles.removeBtn} onPress={removeImage}>
              <Trash2 size={14} color={Colors.sos} />
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.optionInputLabel}>Display Name</Text>
      <TextInput
        style={styles.optionInput}
        value={editAdminName}
        onChangeText={setEditAdminName}
        placeholder="Admin Name"
        placeholderTextColor={Colors.secondary}
      />

      <Text style={styles.optionInputLabel}>Admin Email Address</Text>
      <TextInput
        style={styles.optionInput}
        value={editAdminEmail}
        onChangeText={setEditAdminEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="admin@email.com"
        placeholderTextColor={Colors.secondary}
      />

      <TouchableOpacity style={styles.optionSaveBtn} onPress={handleSaveProfile}>
        <CheckCircle2 size={18} color={Colors.white} />
        <Text style={styles.optionSaveBtnText}>Save Updates</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  collapsibleSecTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  avatarUploadContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  avatarFrame: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
    borderWidth: 3,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 47,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 47,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '700',
  },
  cameraOverlayBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md - 4,
    height: 32,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  uploadBtnText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md - 4,
    height: 32,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.sos,
    backgroundColor: Colors.white,
  },
  removeBtnText: {
    color: Colors.sos,
    fontSize: 12,
    fontWeight: '700',
  },
  optionInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.body,
    marginBottom: 6,
  },
  optionInput: {
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    height: 42,
    marginBottom: Spacing.md,
    fontSize: 14,
    color: Colors.heading,
  },
  optionSaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.primary,
    marginTop: Spacing.xs,
  },
  optionSaveBtnText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});
