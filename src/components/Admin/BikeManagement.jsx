import React, { useState, useEffect } from "react";
import apiClient from "../../../utils/apiClient";
import { Loader } from "./Loader";
import { useSelector } from "react-redux";
import { use } from "react";
const fakeBikesData = [
    {
        id: "1",
        name: "Yamaha R15",
        model: "2023",
        type: "Sport",
        seats: 2,
        horsepower: 18,
        fuel: "Petrol",
        engine: "155cc",
        brakes: "Disc",
        stroke: "4-stroke",
        gearbox: "6-speed",
        mileage: 40,
        pricePerHour: 100,
        duration: "2 hours",
        brand: "Yamaha",
        rating: 4.5,
        reviews: 120,
        image: "", // for demo leave empty or add URL
        featured: true,
        available: true,
        view: [],
        specifications: [{ key: "Top Speed", value: "136 km/h" }],
        about: "Popular sport bike.",
        features: ["ABS", "LED Headlight"],
    },
    {
        id: "2",
        name: "Honda CB Shine",
        model: "2021",
        type: "Standard",
        seats: 2,
        horsepower: 13,
        fuel: "Petrol",
        engine: "125cc",
        brakes: "Drum",
        stroke: "4-stroke",
        gearbox: "5-speed",
        mileage: 50,
        pricePerHour: 80,
        duration: "1 hour",
        brand: "Honda",
        rating: 4.0,
        reviews: 85,
        image: "",
        featured: false,
        available: true,
        view: [],
        specifications: [{ key: "Fuel Tank Capacity", value: "12L" }],
        about: "Reliable daily commuter.",
        features: ["Electric Start"],
    },
];

export default function BikeManager() {
    const [bikes, setBikes] = useState(fakeBikesData);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [viewImageUploading, setViewImageUploading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [submitType, setSubmitType] = useState("update");
    const [formData, setFormData] = useState({
        _id: null,
        name: "",
        model: "",
        type: "",
        seats: 1,
        horsepower: 0,
        fuel: "",
        engine: "",
        brakes: "Disc",
        stroke: "",
        gearbox: "",
        mileage: 0,
        pricePerHour: 0,
        duration: "",
        brand: "",
        rating: 0,
        reviews: 0,
        image: null,
        featured: false,
        available: true,
        view: [],
        specifications: [{ key: "", value: "" }],
        about: "",
        features: [""],
    });
    const BikesData = useSelector((state) => state.bike.bikes);

    useEffect(() => {

        if (BikesData)
            setBikes(BikesData);
    }, [BikesData])
    const [deleteId, setDeleteId] = useState(null);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");

    // Open modal for edit or create
    const openModal = (bike = null) => {
        if (bike) {
            setFormData({
                ...bike,
            });
        } else {
            setFormData({
                _id: null,
                name: "",
                model: "",
                type: "",
                seats: 1,
                horsepower: 0,
                fuel: "",
                engine: "",
                brakes: "Disc",
                stroke: "",
                gearbox: "",
                mileage: 0,
                pricePerHour: 0,
                duration: "",
                brand: "",
                rating: 0,
                reviews: 0,
                image: null,
                featured: false,
                available: true,
                view: [],
                specifications: [{ key: "", value: "" }],
                about: "",
                features: [""],
            });
        }
        setModalOpen(true);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const form = new FormData();
        setImageUploading(true);
        form.append("image", file);
        try {
            const responce = await apiClient.post("/upload/image", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (responce.status === 200) {
                setFormData((prev) => ({
                    ...prev,
                    image: responce.data.imageUrl,
                }));
            }

        } catch (err) {

        } finally {
            setImageUploading(false);
        }

    }


    const handleViewChange = async (e) => {
        const files = Array.from(e.target.files);
        setViewImageUploading(true);
        try {
            const uploadedUrls = await Promise.all(
                files.map(async (file) => {
                    const form = new FormData();
                    form.append('image', file);

                    const response = await apiClient.post("/upload/image", form, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    if (response.status === 200) {
                        return response.data.imageUrl;
                    } else {
                        throw new Error("Upload failed");
                    }
                })
            );

            setFormData((prev) => ({
                ...prev,
                view: [...prev.view, ...uploadedUrls],
            }));

        } catch (err) {
            console.error("Error uploading images:", err);
        } finally {
            setViewImageUploading(false);
        }


    };

    const handleSubmit = async () => {
        console.log(submitType, formData)
        if (!(submitType === "update" || submitType === "add"))
            return;
        try {

            const responce = await (submitType === "add" ? apiClient.post('/bike', formData) : apiClient.put('/bike/' + formData._id, formData));
            if (responce.status === 200) {

            }


        } catch (err) {

        }
    }

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === "image") {
            setFormData((f) => ({ ...f, image: files[0] }));
        } else if (name === "view") {
            // Multiple files
            setFormData((f) => ({ ...f, view: Array.from(files) }));
        } else if (type === "checkbox") {
            setFormData((f) => ({ ...f, [name]: checked }));
        } else if (type === "number") {
            setFormData((f) => ({ ...f, [name]: Number(value) }));
        } else {
            setFormData((f) => ({ ...f, [name]: value }));
        }
    };

    // Features change
    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData((f) => ({ ...f, features: newFeatures }));
    };
    const addFeature = () => {
        setFormData((f) => ({ ...f, features: [...f.features, ""] }));
    };
    const removeFeature = (index) => {
        const newFeatures = [...formData.features];
        newFeatures.splice(index, 1);
        setFormData((f) => ({ ...f, features: newFeatures }));
    };

    // Specifications change
    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index][field] = value;

        setFormData((f) => ({ ...f, specifications: newSpecs }));
    };
    const addSpec = () => {
        setFormData((f) => ({
            ...f,
            specifications: [...f.specifications, { key: "", value: "" }],
        }));
    };
    const removeSpec = (index) => {
        const newSpecs = [...formData.specifications];
        newSpecs.splice(index, 1);
        setFormData((f) => ({ ...f, specifications: newSpecs }));
    };

    // Delete handlers

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteConfirmText("");
        setDeleteModalOpen(true);
    };
    const confirmDelete = async () => {
        if (deleteConfirmText === "DELETE") {
            try {
                const responce = await apiClient.delete(`/bike/${deleteId}`);
                if (responce.status === 200) {
                    setDeleteModalOpen(false);
                }
            } catch (err) {

            }
            setBikes((prev) => prev.filter((b) => String(b._id) !== String(deleteId)));
            setDeleteModalOpen(false);
        } else {
            alert("Type DELETE exactly to confirm");
        }
    };

    // Filtered list based on search
    const filteredBikes = bikes.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="p-6 max-w-7xl mx-auto shadow-2xl">
            <h1 className="text-3xl font-bold mb-6">Manage Bikes</h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search bikes by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 mb-4 rounded w-full md:w-1/3"
            />

            <button
                onClick={() => {
                    openModal();
                    setSubmitType("add");
                }}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
            >
                + Add New Bike
            </button>

            {/* Bikes table */}
            <table className="w-full border-collapse border border-gray-300 mb-12">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Model</th>
                        <th className="border border-gray-300 p-2">Type</th>
                        <th className="border border-gray-300 p-2">Seats</th>
                        <th className="border border-gray-300 p-2">Horsepower</th>
                        <th className="border border-gray-300 p-2">Fuel</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBikes.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center p-4">
                                No bikes found
                            </td>
                        </tr>
                    )}
                    {filteredBikes.map((bike) => (
                        <tr key={bike._id} className="border border-gray-300">
                            <td className="p-2">{bike.name}</td>
                            <td className="p-2">{bike.model}</td>
                            <td className="p-2">{bike.type}</td>
                            <td className="p-2">{bike.seats}</td>
                            <td className="p-2">{bike.horsepower}</td>
                            <td className="p-2">{bike.fuel}</td>
                            <td className="p-2 space-x-2">
                                <button
                                    onClick={() => {
                                        openModal(bike);
                                        setSubmitType("update");

                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => openDeleteModal(bike._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-lg relative">
                        <h2 className="text-2xl font-semibold mb-4">
                            {formData.id ? "Edit Bike" : "Add New Bike"}
                        </h2>

                        {/* Form */}
                        <div className="space-y-4">
                            {/* Text inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Name *</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Model *</label>
                                    <input
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Type *</label>
                                    <input
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Seats</label>
                                    <input
                                        name="seats"
                                        value={formData.seats}
                                        onChange={handleChange}
                                        type="number"
                                        min={1}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Horsepower</label>
                                    <input
                                        name="horsepower"
                                        value={formData.horsepower}
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Fuel</label>
                                    <input
                                        name="fuel"
                                        value={formData.fuel}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Engine</label>
                                    <input
                                        name="engine"
                                        value={formData.engine}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Brakes</label>
                                    <select
                                        name="brakes"
                                        value={formData.brakes}
                                        onChange={handleChange}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="Disc">Disc</option>
                                        <option value="Drum">Drum</option>
                                        <option value="ABS">ABS</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Stroke</label>
                                    <input
                                        name="stroke"
                                        value={formData.stroke}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Gearbox</label>
                                    <input
                                        name="gearbox"
                                        value={formData.gearbox}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Mileage</label>
                                    <input
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Price per hour</label>
                                    <input
                                        name="pricePerHour"
                                        value={formData.pricePerHour}
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Duration</label>
                                    <input
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="e.g. 2 hours"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Brand</label>
                                    <input
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Rating</label>
                                    <input
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                        max={5}
                                        step={0.1}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Reviews</label>
                                    <input
                                        name="reviews"
                                        value={formData.reviews}
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Discount</label>
                                    <input
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                        max={100}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Top Speed</label>
                                    <input
                                        name="topSpeed"
                                        value={formData.topSpeed}
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            {/* Image input */}
                            <div>
                                <label className="block font-semibold mb-1">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {
                                    imageUploading && <Loader />
                                }
                                {formData.image && (
                                    <img
                                        src={typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image)}
                                        alt="Bike"
                                        className="mt-2 max-h-40 rounded"
                                    />
                                )}
                            </div>

                            {/* View input (multiple images) */}
                            <div>
                                <label className="block font-semibold mb-1">View Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleViewChange}
                                />
                                {
                                    viewImageUploading && <Loader />
                                }
                                <div className="flex space-x-2 mt-2 overflow-x-auto max-w-full">
                                    {formData.view &&
                                        formData.view.map((file, idx) => (
                                            <img
                                                key={idx}
                                                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                                alt={`View ${idx + 1}`}
                                                className="h-24 w-auto rounded"
                                            />
                                        ))}
                                </div>
                            </div>

                            {/* Features array */}
                            <div>
                                <label className="block font-semibold mb-1">Features</label>
                                {formData.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                            className="border p-2 rounded flex-grow"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(idx)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    + Add Feature
                                </button>
                            </div>

                            {/* Specifications (key-value pairs) */}
                            <div>
                                <label className="block font-semibold mb-1">Specifications</label>
                                {Object.entries(formData.specifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Key"
                                            value={value.key}
                                            onChange={(e) => handleSpecChange(key, "key", e.target.value)}
                                            className="border p-2 rounded w-1/3 bg-gray-100"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Value"
                                            value={value.value}
                                            name="value"
                                            onChange={(e) => handleSpecChange(key, "value", e.target.value)}
                                            className="border p-2 rounded w-2/3"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeSpec(key)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSpec}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    + Add Specification
                                </button>
                            </div>

                            {/* Checkboxes */}
                            <div className="flex items-center space-x-8 mt-4">
                                <label className="inline-flex items-center space-x-2">
                                    <input
                                        name="featured"
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="form-checkbox"
                                    />
                                    <span>Featured</span>
                                </label>

                                <label className="inline-flex items-center space-x-2">
                                    <input
                                        name="available"
                                        type="checkbox"
                                        checked={formData.available}
                                        onChange={handleChange}
                                        className="form-checkbox"
                                    />
                                    <span>Available</span>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Close modal button (optional) */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this bike?</p>
                        <input type="text" className="outline-none border-gray-300 rounded-md pl-2 h-10 w-40 font-bold border-2" placeholder="type `DELETE` " value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} />
                        <div className="flex justify-end space-x-4 mt-6">

                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>




    )
}

