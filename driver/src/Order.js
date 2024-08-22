import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function Order() {
    // State for form fields
    const [formData, setFormData] = useState({
        facilityName: '',
        ownerName: '',
        address: '',
        businessType: 1,
        businessLicenseNumber: '',
        licenseIssueDate: '',
        foodType: '',
        file: null
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            file: e.target.files[0]
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:3001/api/submit-order', {
                method: 'POST',
                body: formDataToSend
            });
            const result = await response.json();
            // Handle the result from the backend
            alert("Tạo đăng ký thành công")
            window.location.href = `/`;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=''>
            <div className="space-y-12 p-[100px]">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Đăng ký chứng nhận an toàn thực phẩm</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 flex">
                        <div className="sm:col-span-full flex">
                            <div className='w-1/2'>
                                <label htmlFor="facilityName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tên cơ sở
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="facilityName"
                                            name="facilityName"
                                            type="text"
                                            placeholder="Tên cơ sở"
                                            autoComplete="off"
                                            value={formData.facilityName}
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="ownerName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Chủ cơ sở
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="ownerName"
                                            name="ownerName"
                                            type="text"
                                            placeholder="Chủ cơ sở"
                                            autoComplete="off"
                                            value={formData.ownerName}
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-full flex">
                            <div className='w-1/2'>
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Địa chỉ
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            placeholder="Địa chỉ"
                                            autoComplete="off"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="businessType" className="block text-sm font-medium leading-6 text-gray-900">
                                    Loại hình kinh doanh
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="businessType"
                                            name="businessType"
                                            type="text"
                                            placeholder="Loại hình kinh doanh"
                                            autoComplete="off"
                                            value={formData.businessType}
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-full flex">
                            <div className='w-1/2'>
                                <label htmlFor="businessLicenseNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                    Số giấy phép kinh doanh
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="businessLicenseNumber"
                                            name="businessLicenseNumber"
                                            type="text"
                                            placeholder="Số giấy phép kinh doanh"
                                            autoComplete="off"
                                            value={formData.businessLicenseNumber}
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="licenseIssueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Ngày cấp giấy phép
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="licenseIssueDate"
                                            name="licenseIssueDate"
                                            type="date"
                                            placeholder="Ngày cấp giấy phép"
                                            autoComplete="off"
                                            value={formData.licenseIssueDate}
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-full flex">
                            <div className='w-1/2'>
                                <label htmlFor="foodType" className="block text-sm font-medium leading-6 text-gray-900">
                                    Loại thực phẩm
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="foodType"
                                            name="foodType"
                                            type="text"
                                            placeholder="Loại thực phẩm"
                                            autoComplete="off"
                                            value={formData.foodType}
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                                Hình ảnh minh chứng
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file" name="file" type="file" className="sr-only" onChange={handleFileChange} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Gửi hồ sơ
                    </button>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Huỷ
                    </button>
                </div>
            </div>
        </form>
    );
}
