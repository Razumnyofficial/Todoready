import { useState } from 'react';
import { Modal, Button, Select, Space, Tag } from 'antd';
import { updateUserRoles } from '@/api/users';
import { Roles } from '@/types/usersTypes';

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

    const handleRoleChange = (value: Roles) => {
        setSelectedRole(value);
    };

    const handleRemoveRole = async (roleToRemove: Roles) => {
        Modal.confirm({
            title: 'Подтверждение',
            content: `Вы уверены, что хотите удалить роль ${roleToRemove}?`,
            okText: 'Да',
            cancelText: 'Нет',
            onOk: async () => {
                setLoading(true);
                try {
                    const updatedRoles = currentRoles.filter(role => role !== roleToRemove);
                    await updateUserRoles(userId, updatedRoles);
                    onSuccess();
                } catch (error) {
                    console.error('Ошибка при удалении роли:', error);
                    Modal.error({
                        title: 'Ошибка',
                        content: 'Произошла ошибка при удалении роли'
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleAddRole = async () => {
        if (!selectedRole) return;

        Modal.confirm({
            title: 'Подтверждение',
            content: `Вы уверены, что хотите добавить роль ${selectedRole}?`,
            okText: 'Да',
            cancelText: 'Нет',
            onOk: async () => {
                setLoading(true);
                try {
                    const updatedRoles = [...currentRoles, selectedRole];
                    await updateUserRoles(userId, updatedRoles);
                    onSuccess();
                    setSelectedRole(null);
                } catch (error) {
                    console.error('Ошибка при добавлении роли:', error);
                    Modal.error({
                        title: 'Ошибка',
                        content: 'Произошла ошибка при добавлении роли'
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    return (
        <div>
            <Button size="small" type="primary" onClick={openModal}>
                Роли
            </Button>

            <Modal
                title="Управление ролями"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={500}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <div>
                        <h3>Текущие роли:</h3>
                        <Space wrap>
                            {currentRoles.map(role => (
                                <Tag
                                    key={role}
                                    closable
                                    onClose={() => handleRemoveRole(role)}
                                    style={{ fontSize: '14px', padding: '4px 8px' }}
                                >
                                    {role}
                                </Tag>
                            ))}
                        </Space>
                    </div>

                    <div>
                        <h3>Добавить роль:</h3>
                        <Space>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Выберите роль"
                                value={selectedRole}
                                onChange={handleRoleChange}
                                disabled={loading}
                                options={Object.values(Roles)
                                    .filter(role => !currentRoles.includes(role))
                                    .map(role => ({
                                        value: role,
                                        label: role
                                    }))}
                            />
                            <Button
                                type="primary"
                                onClick={handleAddRole}
                                disabled={!selectedRole || loading}
                            >
                                Добавить
                            </Button>
                        </Space>
                    </div>
                </Space>
            </Modal>
        </div>
    );
};

export default RoleManagement; 