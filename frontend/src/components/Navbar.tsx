import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PouppeiLogo from '../assets/pouppei.jpg';
import ProfileModal from './modal/ProfileModal';

const NavBar: React.FC = () => {
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

	const openProfileModal = () => {
		setIsProfileModalOpen(true);
	};

	const closeProfileModal = () => {
		setIsProfileModalOpen(false);
	};

	const handleProfileSave = (profileData: { name: string; email: string; birthDate: string; gender: string }) => {
		// Handle profile save logic here, e.g., update user profile
		console.log('Profile data saved:', profileData);
	};

	const handleLogout = () => {
		// Handle logout logic here, e.g., clear session, redirect to login page
		console.log('Logged out');
	};

	return (
		<>
			<nav className="bg-purple-600 p-4 flex justify-center">
				<div className="flex items-center justify-between w-full max-w-6xl">
					<img src={PouppeiLogo} alt="Pouppei" className="h-14" />
					<div className="flex items-center space-x-4">
						<Link to="/" className="text-white text-lg">visão geral</Link>
						<Link to="/transactions" className="text-white text-lg">lançamentos</Link>
						{/* <Link to="/reports" className="text-white text-lg">relatórios</Link> */}
						{/* <Link to="/spending-limit" className="text-white text-lg">limite de gastos</Link> */}
					</div>
					<div className="flex items-center space-x-4">
						<Link to="/categories">
							<button className="text-white">
								<i className="fas fa-cog"></i>
							</button>
						</Link>
						<button className="text-white">
							<i className="fas fa-bell"></i>
						</button>
						<button className="text-white rounded-full bg-purple-700 p-2" onClick={openProfileModal}>
							<i className="fas fa-user"></i>
						</button>
					</div>
				</div>
			</nav>
			{isProfileModalOpen && (
				<ProfileModal
					isOpen={isProfileModalOpen}
					onClose={closeProfileModal}
					onSave={handleProfileSave}
					onLogout={handleLogout}
				/>
			)}
		</>
	);
};

export default NavBar;
