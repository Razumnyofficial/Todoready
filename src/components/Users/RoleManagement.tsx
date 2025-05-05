import { useState } from 'react';
import { updateUserRoles } from '@/api/users';
import { Roles } from '@/types/usersTypes';
import styles from './RoleManagement.module.css';

interface RoleManagementProps {
    userId: number;
    currentRoles: Roles[];
    onSuccess: () => void;
}

const RoleManagement = ({ userId, currentRoles, onSuccess }: RoleManagementProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Roles | null>(null);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRole(null);
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value as Roles);
    };

    const handleRemoveRole = async (roleToRemove: Roles) => {
        if (!window.confirm(`Вы уверены, что хотите удалить роль ${roleToRemove}?`)) {
            return;
        }

        setLoading(true);
        try {
            const updatedRoles = currentRoles.filter(role => role !== roleToRemove);
            await updateUserRoles(userId, updatedRoles);
            onSuccess();
        } catch (error) {
            console.error('Ошибка при удалении роли:', error);
            alert('Произошла ошибка при удалении роли');
        } finally {
            setLoading(false);
        }
    };

    const handleAddRole = async () => {
        if (!selectedRole) return;

        if (!window.confirm(`Вы уверены, что хотите добавить роль ${selectedRole}?`)) {
            return;
        }

        setLoading(true);
        try {
            const updatedRoles = [...currentRoles, selectedRole];
            await updateUserRoles(userId, updatedRoles);
            onSuccess();
            setSelectedRole(null);
        } catch (error) {
            console.error('Ошибка при добавлении роли:', error);
            alert('Произошла ошибка при добавлении роли');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.roleManagement}>
            <button className={styles.roleButton} onClick={openModal}>
                Роли
            </button>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Управление ролями</h2>
                            <button className={styles.closeButton} onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.currentRoles}>
                                <h3>Текущие роли:</h3>
                                <div className={styles.rolesList}>
                                    {currentRoles.map(role => (
                                        <div key={role} className={styles.roleItem}>
                                            {role}
                                            <button 
                                                className={styles.removeRoleButton}
                                                onClick={() => handleRemoveRole(role)}
                                                disabled={loading}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.addRole}>
                                <h3>Добавить роль:</h3>
                                <select 
                                    value={selectedRole || ''}
                                    onChange={handleRoleChange}
                                    className={styles.roleSelect}
                                    disabled={loading}
                                >
                                    <option value="">Выберите роль</option>
                                    {Object.values(Roles).map(role => (
                                        !currentRoles.includes(role) && (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        )
                                    ))}
                                </select>
                                <button 
                                    className={styles.addRoleButton}
                                    onClick={handleAddRole}
                                    disabled={!selectedRole || loading}
                                >
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleManagement; 